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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  LocalHospital,
  LocationOn,
  AccessTime,
  Phone,
  Inventory,
  Schedule,
  Info,
  CheckCircle,
} from '@mui/icons-material';

const SanitaryAidPage = () => {
  const donationBins = [
    {
      id: 1,
      name: 'Cape Town Central Library',
      address: '60 Strand Street, Cape Town City Centre, Western Cape',
      phone: '+27 21 400 3500',
      operatingHours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
      availableItems: ['Sanitary Pads', 'Tampons', 'Soap', 'Underwear'],
      lastRestocked: '2025-08-28',
      status: 'Well Stocked',
      description: 'Located at the main entrance. Free access to essential hygiene products for women in need.',
      contactPerson: 'Sarah Mthembu',
    },
    {
      id: 2,
      name: 'Johannesburg Women\'s Health Clinic',
      address: '123 Commissioner Street, Johannesburg Central, Gauteng',
      phone: '+27 11 358 0000',
      operatingHours: 'Mon-Fri: 7:00 AM - 7:00 PM, Weekends: 8:00 AM - 2:00 PM',
      availableItems: ['Sanitary Pads', 'Tampons', 'Menstrual Cups', 'Soap', 'Toilet Paper'],
      lastRestocked: '2025-08-29',
      status: 'Well Stocked',
      description: 'Free hygiene products available at reception. No questions asked policy.',
      contactPerson: 'Dr. Nalini Patel',
    },
    {
      id: 3,
      name: 'Durban Community Center',
      address: '45 Dr Pixley KaSeme Street, Durban Central, KwaZulu-Natal',
      phone: '+27 31 311 1111',
      operatingHours: 'Mon-Sat: 8:00 AM - 5:00 PM, Sun: Closed',
      availableItems: ['Sanitary Pads', 'Soap', 'Shampoo', 'Toothbrush', 'Toothpaste'],
      lastRestocked: '2025-08-26',
      status: 'Low Stock',
      description: 'Community-supported donation bin. Help yourself to what you need.',
      contactPerson: 'Nomthandazo Dlamini',
    },
  ];

  const hygieneTips = [
    {
      title: 'Menstrual Hygiene',
      tips: [
        'Change sanitary products every 4-6 hours',
        'Wash hands before and after changing products',
        'Use only one method at a time (pad OR tampon)',
        'Keep track of your cycle for better planning'
      ]
    },
    {
      title: 'General Hygiene',
      tips: [
        'Wash intimate areas with warm water and mild soap',
        'Always wipe from front to back',
        'Wear clean, cotton underwear',
        'Change underwear daily'
      ]
    },
    {
      title: 'Emergency Alternatives',
      tips: [
        'Clean cloth can be used temporarily',
        'Toilet paper folded multiple times',
        'Always prioritize cleanliness',
        'Seek proper products as soon as possible'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'well stocked':
        return 'success';
      case 'low stock':
        return 'warning';
      case 'out of stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LocalHospital sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Sanitary Aid & Hygiene Support
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Access free sanitary products and hygiene essentials from our donation bins across South Africa
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Donation Bins */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Inventory sx={{ mr: 1, verticalAlign: 'middle' }} />
              Donation Bin Locations
            </Typography>
            
            {donationBins.map((bin) => (
              <Card key={bin.id} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                      {bin.name}
                    </Typography>
                    <Chip
                      label={bin.status}
                      color={getStatusColor(bin.status)}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {bin.description}
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Address:</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{bin.address}</Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTime sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Hours:</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{bin.operatingHours}</Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Phone sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Contact:</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                          {bin.contactPerson} - {bin.phone}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Available Items:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ml: 2 }}>
                          {bin.availableItems.map((item, index) => (
                            <Chip
                              key={index}
                              label={item}
                              size="small"
                              variant="outlined"
                              color="primary"
                              icon={<CheckCircle />}
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Schedule sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Last Restocked:</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                          {getDaysAgo(bin.lastRestocked)} days ago
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained"
                      startIcon={<Phone />}
                      href={`tel:${bin.phone}`}
                    >
                      Call Location
                    </Button>
                    <Button 
                      variant="outlined"
                      startIcon={<LocationOn />}
                      href={`https://maps.google.com/?q=${encodeURIComponent(bin.address)}`}
                      target="_blank"
                    >
                      Get Directions
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Hygiene Tips & Info */}
          <Grid item xs={12} lg={4}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
              Hygiene Tips
            </Typography>
            
            {hygieneTips.map((section, sectionIndex) => (
              <Card key={sectionIndex} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {section.title}
                  </Typography>
                  <List dense>
                    {section.tips.map((tip, tipIndex) => (
                      <ListItem key={tipIndex} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                            {tipIndex + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary={tip}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}

            {/* Donation Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                  Want to Donate?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Help keep our donation bins stocked with essential hygiene products.
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Sanitary pads & tampons"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Soap & personal hygiene items"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="New underwear (all sizes)"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Learn More About Donating
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SanitaryAidPage;
