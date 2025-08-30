import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
} from '@mui/icons-material';
import RequestFormModal from '../components/RequestFormModal';
import axios from 'axios';

const RequestsPage = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for initial state
  const getMockRequests = () => [
    {
      id: 'REQ001',
      name: 'Sarah M.',
      requestType: t('requests.types.finance'),
      description: t('requests.mockData.req001.description'),
      status: 'Processing',
      timestamp: new Date().toISOString(),
      location: t('requests.mockData.req001.location')
    },
    {
      id: 'REQ002',
      name: t('requests.mockData.req002.name'),
      requestType: t('requests.types.gbvSupport'),
      description: t('requests.mockData.req002.description'),
      status: 'Urgent',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      location: t('requests.mockData.req002.location')
    },
    {
      id: 'REQ003',
      name: 'Linda K.',
      requestType: t('requests.types.sanitaryAid'),
      description: t('requests.mockData.req003.description'),
      status: 'Completed',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      location: t('requests.mockData.req003.location')
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      // Use mock data if API fails
      setRequests(getMockRequests());
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

  const getTranslatedStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return t('requests.status.completed');
      case 'processing':
        return t('requests.status.processing');
      case 'urgent':
        return t('requests.status.urgent');
      default:
        return status;
    }
  };

  const getTypeIcon = (type) => {
    return <Assignment />;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {t('requests.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('requests.subtitle')}
            </Typography>
          </Box>
          <IconButton onClick={fetchRequests} color="primary">
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* Requests Grid */}
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {t('requests.loading')}
            </Typography>
          </Box>
        ) : requests.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Assignment sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.secondary">
              {t('requests.noRequests')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('requests.noRequestsDesc')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              size="large"
            >
              {t('requests.submitRequest')}
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
                        label={getTranslatedStatus(request.status)}
                        color={getStatusColor(request.status)}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>

                    {/* Content */}
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>{t('requests.type')}:</strong> {request.requestType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>{t('requests.name')}:</strong> {request.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>{t('requests.location')}:</strong> {request.location}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                      {request.description}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {t('requests.submitted')}: {new Date(request.timestamp).toLocaleString()}
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
