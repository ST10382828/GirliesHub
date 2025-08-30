import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Security,
  Phone,
  LocationOn,
  AccessTime,
  Home,
  LocalHospital,
  Gavel,
  Warning,
  EmergencyShare,
} from '@mui/icons-material';

const GBVSupportPage = () => {
  const safeShelters = [
    {
      id: 1,
      name: 'Safe Haven Women\'s Shelter',
      address: '123 Hope Street, Cape Town, Western Cape',
      phone: '+27 21 123 4567',
      emergency: '+27 21 123 4568',
      capacity: 'Available',
      services: ['Emergency Accommodation', 'Counseling', 'Legal Support', 'Job Training'],
      operatingHours: '24/7 Emergency Access',
      description: 'A secure facility providing comprehensive support for women and children escaping domestic violence.',
    },
    {
      id: 2,
      name: 'Ubuntu Women\'s Sanctuary',
      address: '456 Freedom Avenue, Johannesburg, Gauteng',
      phone: '+27 11 987 6543',
      emergency: '+27 11 987 6544',
      capacity: 'Limited',
      services: ['Safe Housing', 'Trauma Counseling', 'Legal Aid', 'Children Support'],
      operatingHours: '24/7 Emergency Access',
      description: 'Providing a safe environment with holistic support services for survivors of gender-based violence.',
    },
    {
      id: 3,
      name: 'Themba House',
      address: '789 Courage Road, Durban, KwaZulu-Natal',
      phone: '+27 31 555 7890',
      emergency: '+27 31 555 7891',
      capacity: 'Available',
      services: ['Emergency Shelter', 'Medical Support', 'Court Support', 'Skills Development'],
      operatingHours: '24/7 Emergency Access',
      description: 'A community-based shelter offering immediate safety and long-term empowerment programs.',
    },
  ];

  const emergencyContacts = [
    {
      name: 'National GBV Command Centre',
      number: '0800 428 428',
      description: '24/7 toll-free helpline for immediate assistance',
      type: 'emergency'
    },
    {
      name: 'South African Police Service',
      number: '10111',
      description: 'Emergency police response',
      type: 'emergency'
    },
    {
      name: 'LifeLine National',
      number: '0861 322 322',
      description: '24/7 counseling and crisis support',
      type: 'support'
    },
    {
      name: 'Childline South Africa',
      number: '116',
      description: 'Support for children in crisis',
      type: 'support'
    }
  ];

  const getCapacityColor = (capacity) => {
    switch (capacity.toLowerCase()) {
      case 'available':
        return 'success';
      case 'limited':
        return 'warning';
      case 'full':
        return 'error';
      default:
        return 'default';
    }
  };

  const getContactTypeIcon = (type) => {
    return type === 'emergency' ? <EmergencyShare /> : <Phone />;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Security sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'error.main' }}>
            GBV Support & Safe Shelters
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Immediate support and safe shelter locations for women experiencing gender-based violence
          </Typography>
        </Box>

        {/* Emergency Alert */}
        <Alert 
          severity="error" 
          sx={{ mb: 4, fontSize: '1.1rem' }}
          icon={<Warning />}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            In Immediate Danger?
          </Typography>
          <Typography>
            Call <strong>0800 428 428</strong> (GBV Command Centre) or <strong>10111</strong> (Police) immediately. 
            These services are available 24/7 and completely free.
          </Typography>
        </Alert>

        <Grid container spacing={4}>
          {/* Safe Shelters */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Home sx={{ mr: 1, verticalAlign: 'middle' }} />
              Safe Shelter Locations
            </Typography>
            
            {safeShelters.map((shelter) => (
              <Card key={shelter.id} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                      {shelter.name}
                    </Typography>
                    <Chip
                      label={shelter.capacity}
                      color={getCapacityColor(shelter.capacity)}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {shelter.description}
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Address:</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{shelter.address}</Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTime sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Hours:</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{shelter.operatingHours}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Contact Numbers:</Typography>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2">
                            <Phone sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                            General: {shelter.phone}
                          </Typography>
                          <Typography variant="body2" color="error.main" sx={{ fontWeight: 'bold' }}>
                                            <EmergencyShare sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                Emergency: {shelter.emergency}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Services Available:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {shelter.services.map((service, index) => (
                        <Chip
                          key={index}
                          label={service}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      color="error"
                      startIcon={<Phone />}
                      href={`tel:${shelter.emergency}`}
                    >
                      Emergency Call
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Phone />}
                      href={`tel:${shelter.phone}`}
                    >
                      General Contact
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Emergency Contacts */}
          <Grid item xs={12} lg={4}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Phone sx={{ mr: 1, verticalAlign: 'middle' }} />
              Emergency Contacts
            </Typography>
            
            <Card>
              <CardContent sx={{ p: 0 }}>
                <List>
                  {emergencyContacts.map((contact, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {getContactTypeIcon(contact.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {contact.name}
                              </Typography>
                            }
                          />
                        </Box>
                        <Box sx={{ pl: 5, width: '100%' }}>
                          <Typography 
                            variant="h6" 
                            color={contact.type === 'emergency' ? 'error.main' : 'primary.main'}
                            sx={{ fontWeight: 'bold', mb: 1 }}
                          >
                            {contact.number}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {contact.description}
                          </Typography>
                          <Button
                            variant={contact.type === 'emergency' ? 'contained' : 'outlined'}
                            color={contact.type === 'emergency' ? 'error' : 'primary'}
                            size="small"
                            startIcon={<Phone />}
                            href={`tel:${contact.number}`}
                            fullWidth
                          >
                            Call Now
                          </Button>
                        </Box>
                      </ListItem>
                      {index < emergencyContacts.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  <Gavel sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Legal Resources
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Gavel fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Legal Aid South Africa" 
                      secondary="Free legal assistance: 0800 110 110"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalHospital fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Medical Support" 
                      secondary="Available at all shelter locations"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GBVSupportPage;
