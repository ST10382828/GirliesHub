import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Fab,
  Grid,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Assignment,
  AccountBalance,
  Security,
  LocalHospital,
} from '@mui/icons-material';
import RequestFormModal from '../components/RequestFormModal';
import axios from 'axios';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for initial state
  const mockRequests = [
    {
      id: 'REQ001',
      name: 'Sarah M.',
      requestType: 'Finance',
      description: 'Looking for investment advice for small business startup',
      status: 'Processing',
      timestamp: new Date().toISOString(),
      location: 'Cape Town, Western Cape'
    },
    {
      id: 'REQ002',
      name: 'Anonymous',
      requestType: 'GBV Support',
      description: 'Need immediate safe shelter information',
      status: 'Urgent',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      location: 'Johannesburg, Gauteng'
    },
    {
      id: 'REQ003',
      name: 'Linda K.',
      requestType: 'Sanitary Aid',
      description: 'Looking for nearby donation bins for hygiene products',
      status: 'Completed',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      location: 'Durban, KwaZulu-Natal'
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Fetch from blockchain first
      const blockchainResponse = await axios.get('/api/blockchain/requests');
      console.log('Blockchain requests:', blockchainResponse.data);
      
      // Also fetch from backend for additional data
      const backendResponse = await axios.get('/api/requests');
      console.log('Backend requests:', backendResponse.data);
      
      // Combine blockchain data with backend data
      const blockchainRequests = blockchainResponse.data.requests || blockchainResponse.data;
      const backendRequests = backendResponse.data;
      
      // Create a map of backend requests by ID for easy lookup
      const backendMap = new Map();
      backendRequests.forEach(req => {
        backendMap.set(req.id, req);
      });
      
      // Combine the data, prioritizing blockchain data
      const combinedRequests = blockchainRequests.map(blockchainReq => {
        const backendReq = backendMap.get(blockchainReq.id);
        return {
          ...blockchainReq,
          name: backendReq?.name || 'Anonymous',
          description: backendReq?.description || 'Request stored on blockchain',
          location: backendReq?.location || 'Unknown',
          status: backendReq?.status || 'Processing'
        };
      });
      
      setRequests(combinedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Use mock data if API fails
      setRequests(mockRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSubmitted = (newRequest) => {
    setRequests([newRequest, ...requests]);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'urgent':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'finance':
        return <AccountBalance />;
      case 'gbv support':
      case 'gbv':
        return <Security />;
      case 'sanitary aid':
      case 'sanitary':
        return <LocalHospital />;
      default:
        return <Assignment />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Support Requests
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View blockchain-stored requests and submit new ones
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton 
              onClick={fetchRequests} 
              color="primary"
              disabled={loading}
              title="Refresh blockchain data"
            >
              <RefreshIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              size="medium"
            >
              Submit Request
            </Button>
          </Box>
        </Box>

        {/* Requests Grid */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Loading requests...
            </Typography>
          </Box>
        ) : requests.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Assignment sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.secondary">
              No requests yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by submitting your first support request
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              size="large"
            >
              Submit Request
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {requests.map((request) => (
              <Grid item xs={12} md={6} lg={4} key={request.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(request.requestType)}
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                          {request.id}
                        </Typography>
                      </Box>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status)}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>

                    {/* Content */}
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Type:</strong> {request.requestType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Name:</strong> {request.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Location:</strong> {request.location}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                      {request.description}
                    </Typography>
                    
                    {/* Blockchain Information */}
                    {request.requestHash && (
                      <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          <strong>Blockchain Hash:</strong> {request.requestHash.slice(0, 20)}...
                        </Typography>
                        {request.requester && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            <strong>Requester:</strong> {request.requester.slice(0, 10)}...{request.requester.slice(-8)}
                          </Typography>
                        )}
                      </Box>
                    )}
                    
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 2, display: 'block' }}>
                      Submitted: {new Date(request.timestamp).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add request"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => setModalOpen(true)}
        >
          <AddIcon />
        </Fab>

        {/* Request Form Modal */}
        <RequestFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onRequestSubmitted={handleRequestSubmitted}
        />
      </Box>
    </Container>
  );
};

export default RequestsPage;
