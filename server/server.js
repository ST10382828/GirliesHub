require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { storeHashOnBlockchain, getTransactionProof, getRequestsFromBlockchain, getRequestCount } = require('./blockchain');
const { chatWithAI } = require('./ai');
const { authMiddleware, optionalAuthMiddleware } = require('./middleware/authFirebase');
const { createRequest, updateRequest, getRequest, listRequests } = require('./services/firestoreService');
const { computeCanonicalHash } = require('./utils/hash');
const { encryptIfEnabled } = require('./utils/crypto');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-memory storage for demo (replace with database later)
let requests = [
  {
    id: 'REQ001',
    name: 'Sarah M.',
    requestType: 'Finance',
    description: 'Looking for investment advice for small business startup',
    status: 'Processing',
    timestamp: new Date().toISOString(),
    location: 'Cape Town, Western Cape',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'REQ002',
    name: 'Anonymous',
    requestType: 'GBV Support',
    description: 'Need immediate safe shelter information',
    status: 'Urgent',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    location: 'Johannesburg, Gauteng',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
  },
  {
    id: 'REQ003',
    name: 'Linda K.',
    requestType: 'Sanitary Aid',
    description: 'Looking for nearby donation bins for hygiene products',
    status: 'Completed',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    location: 'Durban, KwaZulu-Natal',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0]
  }
];

// Generate unique request ID
function generateRequestId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `REQ${timestamp}${random}`.substring(0, 10).toUpperCase();
}

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'GirliesHub API is running',
    timestamp: new Date().toISOString()
  });
});

// Get all requests (excluding deleted ones) - optional auth for user-specific filtering
app.get('/api/requests', optionalAuthMiddleware, async (req, res) => {
  try {
    console.log('Fetching all requests from Firestore');
    
    // Get requests from Firestore
    const firestoreRequests = await listRequests();
    
    // If user is authenticated, add user-specific info
    if (req.user && req.user.uid) {
      console.log(`User ${req.user.email} (${req.user.uid}) fetching requests`);
      
      // Filter requests submitted by this user
      const myRequests = firestoreRequests.filter(req => req.submittedBy === req.user.uid);
      
      // Add user info to response
      const response = {
        requests: firestoreRequests,
        user: {
          uid: req.user.uid,
          email: req.user.email,
          name: req.user.name
        },
        userSpecificData: {
          myRequests: myRequests,
          myRequestCount: myRequests.length
        }
      };
      
      res.json(response);
    } else {
      // Anonymous user - return basic request list
      console.log('Anonymous user fetching requests');
      res.json({
        requests: firestoreRequests,
        user: null,
        message: 'Sign in to see your personal requests and additional features'
      });
    }
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({
      error: 'Failed to fetch requests',
      message: error.message
    });
  }
});

// Get all requests including deleted ones (for admin purposes) - requires auth
app.get('/api/requests/all', authMiddleware, (req, res) => {
  try {
    console.log('Fetching all requests including deleted');
    res.json(requests);
  } catch (error) {
    console.error('Error fetching all requests:', error);
    res.status(500).json({
      error: 'Failed to fetch all requests',
      message: error.message
    });
  }
});

// Submit new request (plural endpoint) - allows anonymous submits
app.post('/api/requests', optionalAuthMiddleware, async (req, res) => {
  try {
    const { name, requestType, description, date, location } = req.body;

    console.log('Received request:', req.body);

    // Validate required fields
    if (!requestType || !description || !location) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['requestType', 'description', 'location']
      });
    }

    // Prepare request data for Firestore
    const requestData = {
      name: name || (req.user ? req.user.name : 'Anonymous'),
      requestType,
      description: encryptIfEnabled(description), // Encrypt sensitive data
      date: date || new Date().toISOString(),
      location,
      timestamp: new Date().toISOString(),
      // Add user info if authenticated
      submittedBy: req.user ? req.user.uid : null,
      userEmail: req.user ? req.user.email : null,
      anonymous: !req.user
    };

    console.log('Creating Firestore document...');

    // STEP 1: Write to Firestore with status 'pending'
    const firestoreDoc = await createRequest(requestData);
    console.log('✅ Firestore document created:', firestoreDoc.id);

    // STEP 2: Compute canonical hash
    const requestHash = computeCanonicalHash(firestoreDoc);
    console.log('✅ Canonical hash computed:', requestHash.substring(0, 20) + '...');

    // STEP 3: Update Firestore doc with hash
    await updateRequest(firestoreDoc.id, { requestHash });
    console.log('✅ Firestore document updated with hash');

    // STEP 4: Handle blockchain processing based on DUAL_WRITE_MODE
    const dualWriteMode = process.env.DUAL_WRITE_MODE === 'true';
    let blockchainResult = null;

    if (dualWriteMode) {
      // Dual-write mode: write to both Firestore and blockchain immediately
      try {
        console.log('🔄 Dual-write mode: storing on blockchain immediately...');
        const { storeHashOnBlockchain } = require('./blockchain');
        blockchainResult = await storeHashOnBlockchain(requestHash, requestType);
        
        // Update Firestore with blockchain result
        await updateRequest(firestoreDoc.id, {
          status: 'onchain',
          txHash: blockchainResult.transactionId,
          blockNumber: blockchainResult.blockNumber,
          onchainAt: new Date().toISOString()
        });
        
        console.log(`✅ Dual-write: Request ${firestoreDoc.id} stored on blockchain immediately`);
      } catch (blockchainError) {
        console.error('❌ Dual-write blockchain error:', blockchainError);
        // Fall back to queue processing
        const queueData = {
          requestId: firestoreDoc.id,
          requestHash,
          requestType,
          location,
          submittedBy: req.user ? req.user.uid : null,
          anonymous: !req.user,
          timestamp: new Date().toISOString()
        };
        const { enqueuePendingChain } = require('./services/firestoreService');
        await enqueuePendingChain(queueData);
        console.log('✅ Request enqueued for blockchain processing (fallback)');
      }
    } else {
      // Normal mode: enqueue for blockchain processing
      const queueData = {
        requestId: firestoreDoc.id,
        requestHash,
        requestType,
        location,
        submittedBy: req.user ? req.user.uid : null,
        anonymous: !req.user,
        timestamp: new Date().toISOString()
      };
      const { enqueuePendingChain } = require('./services/firestoreService');
      await enqueuePendingChain(queueData);
      console.log('✅ Request enqueued for blockchain processing');
    }

    // Also add to in-memory storage for backward compatibility
    const inMemoryRequest = {
      id: firestoreDoc.id,
      ...requestData,
      status: blockchainResult ? 'onchain' : 'pending',
      requestHash
    };
    requests.unshift(inMemoryRequest);

    console.log('✅ Request submitted successfully');

    res.status(201).json({
      id: firestoreDoc.id,
      ...requestData,
      status: blockchainResult ? 'onchain' : 'pending',
      requestHash: requestHash.substring(0, 20) + '...',
      txHash: blockchainResult?.transactionId || null,
      message: blockchainResult ? 
        'Request submitted successfully and stored on blockchain immediately' : 
        'Request submitted successfully and queued for blockchain processing'
    });

  } catch (error) {
    console.error('❌ Error creating request:', error);
    res.status(500).json({
      error: 'Failed to create request',
      message: error.message
    });
  }
});

// Submit new request (singular endpoint for backward compatibility) - allows anonymous submits
app.post('/api/request', optionalAuthMiddleware, async (req, res) => {
  try {
    const { name, requestType, description, date, location } = req.body;

    console.log('Received request:', req.body);

    // Validate required fields
    if (!requestType || !description || !location) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['requestType', 'description', 'location']
      });
    }

    // Prepare request data for Firestore
    const requestData = {
      name: name || (req.user ? req.user.name : 'Anonymous'),
      requestType,
      description: encryptIfEnabled(description), // Encrypt sensitive data
      date: date || new Date().toISOString(),
      location,
      timestamp: new Date().toISOString(),
      // Add user info if authenticated
      submittedBy: req.user ? req.user.uid : null,
      userEmail: req.user ? req.user.email : null,
      anonymous: !req.user
    };

    console.log('Creating Firestore document...');

    // STEP 1: Write to Firestore with status 'pending'
    const firestoreDoc = await createRequest(requestData);
    console.log('✅ Firestore document created:', firestoreDoc.id);

    // STEP 2: Compute canonical hash
    const requestHash = computeCanonicalHash(firestoreDoc);
    console.log('✅ Canonical hash computed:', requestHash.substring(0, 20) + '...');

    // STEP 3: Update Firestore doc with hash
    await updateRequest(firestoreDoc.id, { requestHash });
    console.log('✅ Firestore document updated with hash');

    // STEP 4: Enqueue for blockchain processing
    const queueData = {
      requestId: firestoreDoc.id,
      requestHash,
      requestType,
      location,
      submittedBy: req.user ? req.user.uid : null,
      anonymous: !req.user,
      timestamp: new Date().toISOString()
    };

    // Import queue service
    const { enqueuePendingChain } = require('./services/firestoreService');
    await enqueuePendingChain(queueData);
    console.log('✅ Request enqueued for blockchain processing');

    // Also add to in-memory storage for backward compatibility
    const inMemoryRequest = {
      id: firestoreDoc.id,
      ...requestData,
      status: 'pending',
      requestHash
    };
    requests.unshift(inMemoryRequest);

    console.log('✅ Request submitted successfully');

    res.status(201).json({
      id: firestoreDoc.id,
      ...requestData,
      status: 'pending',
      requestHash: requestHash.substring(0, 20) + '...',
      message: 'Request submitted successfully and queued for blockchain processing'
    });

  } catch (error) {
    console.error('❌ Error creating request:', error);
    res.status(500).json({
      error: 'Failed to create request',
      message: error.message
    });
  }
});

// Delete request by ID (soft delete - marks as deleted but keeps for audit)
app.delete('/api/requests/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const requestIndex = requests.findIndex(req => req.id === id);

    if (requestIndex === -1) {
      return res.status(404).json({
        error: 'Request not found',
        id: id
      });
    }

    // Soft delete - mark as deleted instead of removing
    requests[requestIndex].deleted = true;
    requests[requestIndex].deletedAt = new Date().toISOString();
    requests[requestIndex].status = 'Deleted';
    
    const deletedRequest = requests[requestIndex];
    console.log('Soft deleted request:', deletedRequest.id);

    res.json({
      message: 'Request deleted successfully',
      deletedRequest: deletedRequest
    });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({
      error: 'Failed to delete request',
      message: error.message
    });
  }
});

// Get specific request by ID - optional auth for additional user info
app.get('/api/request/:id', optionalAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Read from Firestore instead of in-memory array
    const request = await getRequest(id);

    if (!request) {
      return res.status(404).json({
        error: 'Request not found',
        id: id
      });
    }

    // Add user context if authenticated
    if (req.user && req.user.uid) {
      const response = {
        ...request,
        user: {
          uid: req.user.uid,
          email: req.user.email,
          name: req.user.name
        },
        canEdit: request.submittedBy === req.user.uid,
        canDelete: request.submittedBy === req.user.uid
      };
      res.json(response);
    } else {
      // Anonymous user - return basic request info
      res.json({
        ...request,
        user: null,
        canEdit: false,
        canDelete: false,
        message: 'Sign in to see additional options and manage your requests'
      });
    }
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({
      error: 'Failed to fetch request',
      message: error.message
    });
  }
});

// AI Chat endpoint - requires auth for user context
app.post('/api/ai/chat', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required'
      });
    }

    console.log('AI Chat request:', message);

    // Call AI service (stub function)
    const aiResponse = await chatWithAI(message);

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in AI chat:', error);
    res.status(500).json({
      error: 'AI service temporarily unavailable',
      message: error.message
    });
  }
});

// Blockchain verification endpoint
app.get('/api/blockchain/verify/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Get transaction proof (stub function)
    const proof = await getTransactionProof(id);

    res.json({
      requestId: id,
      verified: true,
      proof: proof,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error verifying blockchain:', error);
    res.status(500).json({
      error: 'Blockchain verification failed',
      message: error.message
    });
  }
});

// Get requests from blockchain
app.get('/api/blockchain/requests', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching requests from blockchain...');
    const blockchainRequests = await getRequestsFromBlockchain();
    
    res.json({
      success: true,
      requests: blockchainRequests,
      count: blockchainRequests.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching blockchain requests:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blockchain requests',
      message: error.message 
    });
  }
});

// Get blockchain request count - requires auth
app.get('/api/blockchain/count', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching blockchain request count...');
    const count = await getRequestCount();
    
    res.json({
      success: true,
      count: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching blockchain count:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blockchain count',
      message: error.message 
    });
  }
});

// Statistics endpoint
app.get('/api/stats', authMiddleware, (req, res) => {
  try {
    const stats = {
      totalRequests: requests.length,
      requestsByType: {
        'Finance': requests.filter(r => r.requestType === 'Finance').length,
        'GBV Support': requests.filter(r => r.requestType === 'GBV Support').length,
        'Sanitary Aid': requests.filter(r => r.requestType === 'Sanitary Aid').length
      },
      requestsByStatus: {
        'Processing': requests.filter(r => r.status === 'Processing').length,
        'Urgent': requests.filter(r => r.status === 'Urgent').length,
        'Completed': requests.filter(r => r.status === 'Completed').length
      },
      lastUpdated: new Date().toISOString()
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GirliesHub API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 API endpoints available:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/requests`);
  console.log(`   POST /api/requests`);
  console.log(`   DELETE /api/requests/:id`);
  console.log(`   GET  /api/request/:id`);
  console.log(`   POST /api/ai/chat`);
  console.log(`   GET  /api/blockchain/verify/:id`);
  console.log(`   GET  /api/blockchain/requests`);
  console.log(`   GET  /api/blockchain/count`);
  console.log(`   GET  /api/stats`);
});

module.exports = app;