const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { storeHashOnBlockchain, getTransactionProof } = require('./blockchain');
const { BlockDAG, Transaction } = require('./blockdag/core');
const { chatWithAI } = require('./ai');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize BlockDAG instance
const blockdag = new BlockDAG();

// In-memory storage for demo (replace with database later)
let donations = [];
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

// Generate unique donation ID
function generateDonationId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `DON${timestamp}${random}`.substring(0, 10).toUpperCase();
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

// Get all requests
app.get('/api/requests', (req, res) => {
  try {
    console.log('Fetching all requests');
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({
      error: 'Failed to fetch requests',
      message: error.message
    });
  }
});

// Submit new request
app.post('/api/requests', async (req, res) => {
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

    // Create new request
    const newRequest = {
      id: generateRequestId(),
      name: name || 'Anonymous',
      requestType,
      description,
      date: date || new Date().toISOString(),
      location,
      status: requestType === 'GBV Support' ? 'Urgent' : 'Processing',
      timestamp: new Date().toISOString()
    };

    // Add to in-memory storage
    requests.unshift(newRequest);

    // Store hash on blockchain (stub function)
    try {
      const blockchainResult = await storeHashOnBlockchain(newRequest);
      console.log('Blockchain storage result:', blockchainResult);
    } catch (blockchainError) {
      console.error('Blockchain storage failed:', blockchainError);
      // Continue anyway - blockchain is optional for demo
    }

    console.log('Created new request:', newRequest);

    res.status(201).json({
      ...newRequest,
      message: 'Request submitted successfully'
    });

  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({
      error: 'Failed to create request',
      message: error.message
    });
  }
});

// Delete request by ID
app.delete('/api/requests/:id', (req, res) => {
  try {
    const { id } = req.params;
    const requestIndex = requests.findIndex(req => req.id === id);

    if (requestIndex === -1) {
      return res.status(404).json({
        error: 'Request not found',
        id: id
      });
    }

    const deletedRequest = requests.splice(requestIndex, 1)[0];
    console.log('Deleted request:', deletedRequest.id);

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

// Get specific request by ID
app.get('/api/request/:id', (req, res) => {
  try {
    const { id } = req.params;
    const request = requests.find(req => req.id === id);

    if (!request) {
      return res.status(404).json({
        error: 'Request not found',
        id: id
      });
    }

    res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({
      error: 'Failed to fetch request',
      message: error.message
    });
  }
});

// AI Chat endpoint
app.post('/api/ai/chat', async (req, res) => {
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
app.get('/api/blockchain/verify/:id', async (req, res) => {
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

// BlockDAG transaction endpoint for donations
app.post('/api/blockdag/transaction', async (req, res) => {
  try {
    const { type, amount, cause, donor, message } = req.body;

    console.log('Creating BlockDAG transaction:', req.body);

    // Create a new transaction for the donation
    const transaction = new Transaction(
      'donation_pool', // from address (donation pool)
      'empowerhub_treasury', // to address (EmpowerHub treasury)
      amount,
      { type, cause, donor, message, timestamp: new Date().toISOString() }
    );

    // Add transaction to BlockDAG
    const result = await blockdag.addTransaction(transaction);
    
    // Mine a new block with this transaction
    const block = await blockdag.mineBlock([transaction]);

    console.log('BlockDAG transaction created:', {
      transactionHash: transaction.hash,
      blockHash: block.hash,
      amount,
      cause
    });

    res.status(201).json({
      success: true,
      transactionHash: transaction.hash,
      blockHash: block.hash,
      amount,
      cause,
      donor,
      timestamp: new Date().toISOString(),
      confirmationScore: block.confirmationScore || 0
    });

  } catch (error) {
    console.error('Error creating BlockDAG transaction:', error);
    res.status(500).json({
      error: 'Failed to create BlockDAG transaction',
      message: error.message
    });
  }
});

// Process donation endpoint
app.post('/api/donations', async (req, res) => {
  try {
    const { amount, cause, paymentMethod, donorInfo, blockdagTxHash } = req.body;

    console.log('Received donation:', req.body);

    // Validate required fields
    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid donation amount',
        message: 'Amount must be greater than 0'
      });
    }

    // Create new donation record
    const newDonation = {
      id: generateDonationId(),
      amount: parseFloat(amount),
      cause: cause || 'general',
      paymentMethod: paymentMethod || 'card',
      donorInfo: {
        name: donorInfo?.name || 'Anonymous',
        email: donorInfo?.email || '',
        message: donorInfo?.message || ''
      },
      status: 'completed',
      timestamp: new Date().toISOString(),
      transactionHash: blockdagTxHash || `0x${Math.random().toString(16).substr(2, 64)}`, // Use BlockDAG hash if available
      blockdagTxHash: blockdagTxHash || null
    };

    // Add to in-memory storage
    donations.unshift(newDonation);

    // Store on blockchain (using existing infrastructure)
    try {
      const blockchainResult = await storeHashOnBlockchain({
        type: 'donation',
        ...newDonation
      });
      console.log('Donation blockchain storage result:', blockchainResult);
    } catch (blockchainError) {
      console.error('Donation blockchain storage failed:', blockchainError);
      // Continue anyway - blockchain is optional for demo
    }

    console.log('Processed donation:', newDonation);

    res.status(201).json({
      ...newDonation,
      message: 'Donation processed successfully'
    });

  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({
      error: 'Failed to process donation',
      message: error.message
    });
  }
});

// Get donation statistics
app.get('/api/donations/stats', (req, res) => {
  try {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const donationsByCause = donations.reduce((acc, d) => {
      acc[d.cause] = (acc[d.cause] || 0) + d.amount;
      return acc;
    }, {});

    const stats = {
      totalDonations,
      totalDonors: donations.length,
      donationsByCause,
      averageDonation: donations.length > 0 ? totalDonations / donations.length : 0,
      recentDonations: donations.slice(0, 5).map(d => ({
        id: d.id,
        amount: d.amount,
        cause: d.cause,
        donor: d.donorInfo.name,
        timestamp: d.timestamp
      })),
      lastUpdated: new Date().toISOString()
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    res.status(500).json({
      error: 'Failed to fetch donation statistics',
      message: error.message
    });
  }
});

// Statistics endpoint
app.get('/api/stats', (req, res) => {
  try {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    
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
      donations: {
        total: totalDonations,
        count: donations.length
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
  console.log(`   POST /api/blockdag/transaction`);
  console.log(`   POST /api/donations`);
  console.log(`   GET  /api/donations/stats`);
  console.log(`   GET  /api/stats`);
});

module.exports = app;