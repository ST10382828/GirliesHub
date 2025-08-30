import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
  const donationBins = [
    {
      id: 1,
      name: t('sanitaryAid.donationBins.locations.capeTown.name'),
      address: t('sanitaryAid.donationBins.locations.capeTown.address'),
      phone: t('sanitaryAid.donationBins.locations.capeTown.phone'),
      operatingHours: t('sanitaryAid.donationBins.locations.capeTown.hours'),
      availableItems: [t('sanitaryAid.donationBins.items.sanitaryPads'), t('sanitaryAid.donationBins.items.tampons'), t('sanitaryAid.donationBins.items.soap'), t('sanitaryAid.donationBins.items.underwear')],
      lastRestocked: '2025-08-28',
      status: t('sanitaryAid.donationBins.status.wellStocked'),
      description: t('sanitaryAid.donationBins.locations.capeTown.description'),
      contactPerson: t('sanitaryAid.donationBins.locations.capeTown.contact'),
    },
    {
      id: 2,
      name: t('sanitaryAid.donationBins.locations.johannesburg.name'),
      address: t('sanitaryAid.donationBins.locations.johannesburg.address'),
      phone: t('sanitaryAid.donationBins.locations.johannesburg.phone'),
      operatingHours: t('sanitaryAid.donationBins.locations.johannesburg.hours'),
      availableItems: [t('sanitaryAid.donationBins.items.sanitaryPads'), t('sanitaryAid.donationBins.items.tampons'), t('sanitaryAid.donationBins.items.menstrualCups'), t('sanitaryAid.donationBins.items.soap'), t('sanitaryAid.donationBins.items.toiletPaper')],
      lastRestocked: '2025-08-29',
      status: t('sanitaryAid.donationBins.status.wellStocked'),
      description: t('sanitaryAid.donationBins.locations.johannesburg.description'),
      contactPerson: t('sanitaryAid.donationBins.locations.johannesburg.contact'),
    },
    {
      id: 3,
      name: t('sanitaryAid.donationBins.locations.durban.name'),
      address: t('sanitaryAid.donationBins.locations.durban.address'),
      phone: t('sanitaryAid.donationBins.locations.durban.phone'),
      operatingHours: t('sanitaryAid.donationBins.locations.durban.hours'),
      availableItems: [t('sanitaryAid.donationBins.items.sanitaryPads'), t('sanitaryAid.donationBins.items.soap'), t('sanitaryAid.donationBins.items.shampoo'), t('sanitaryAid.donationBins.items.toothbrush'), t('sanitaryAid.donationBins.items.toothpaste')],
      lastRestocked: '2025-08-26',
      status: t('sanitaryAid.donationBins.status.lowStock'),
      description: t('sanitaryAid.donationBins.locations.durban.description'),
      contactPerson: t('sanitaryAid.donationBins.locations.durban.contact'),
    },
  ];

  const hygieneTips = [
    {
      title: t('sanitaryAid.hygieneTips.menstrualHygiene.title'),
      tips: [
        t('sanitaryAid.hygieneTips.menstrualHygiene.tips.tip1'),
        t('sanitaryAid.hygieneTips.menstrualHygiene.tips.tip2'),
        t('sanitaryAid.hygieneTips.menstrualHygiene.tips.tip3'),
        t('sanitaryAid.hygieneTips.menstrualHygiene.tips.tip4')
      ]
    },
    {
      title: t('sanitaryAid.hygieneTips.generalHygiene.title'),
      tips: [
        t('sanitaryAid.hygieneTips.generalHygiene.tips.tip1'),
        t('sanitaryAid.hygieneTips.generalHygiene.tips.tip2'),
        t('sanitaryAid.hygieneTips.generalHygiene.tips.tip3'),
        t('sanitaryAid.hygieneTips.generalHygiene.tips.tip4')
      ]
    },
    {
      title: t('sanitaryAid.hygieneTips.emergencyAlternatives.title'),
      tips: [
        t('sanitaryAid.hygieneTips.emergencyAlternatives.tips.tip1'),
        t('sanitaryAid.hygieneTips.emergencyAlternatives.tips.tip2'),
        t('sanitaryAid.hygieneTips.emergencyAlternatives.tips.tip3'),
        t('sanitaryAid.hygieneTips.emergencyAlternatives.tips.tip4')
      ]
    }
  ];

  const getStatusColor = (status) => {
    const wellStocked = t('sanitaryAid.donationBins.status.wellStocked').toLowerCase();
    const lowStock = t('sanitaryAid.donationBins.status.lowStock').toLowerCase();
    const outOfStock = t('sanitaryAid.donationBins.status.outOfStock').toLowerCase();
    
    switch (status.toLowerCase()) {
      case wellStocked:
        return 'success';
      case lowStock:
        return 'warning';
      case outOfStock:
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
            {t('sanitaryAid.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            {t('sanitaryAid.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Donation Bins */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Inventory sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('sanitaryAid.donationBins.title')}
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
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t('sanitaryAid.donationBins.address')}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{bin.address}</Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTime sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t('sanitaryAid.donationBins.hours')}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{bin.operatingHours}</Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Phone sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t('sanitaryAid.donationBins.contact')}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                          {bin.contactPerson} - {bin.phone}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>{t('sanitaryAid.donationBins.availableItems')}</Typography>
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
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t('sanitaryAid.donationBins.lastRestocked')}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>
                          {getDaysAgo(bin.lastRestocked)} {t('sanitaryAid.donationBins.daysAgo')}
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
                      {t('sanitaryAid.donationBins.callLocation')}
                    </Button>
                    <Button 
                      variant="outlined"
                      startIcon={<LocationOn />}
                      href={`https://maps.google.com/?q=${encodeURIComponent(bin.address)}`}
                      target="_blank"
                    >
                      {t('sanitaryAid.donationBins.getDirections')}
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
              {t('sanitaryAid.hygieneTips.title')}
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
                  {t('sanitaryAid.donation.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('sanitaryAid.donation.description')}
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('sanitaryAid.donation.items.sanitaryProducts')}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('sanitaryAid.donation.items.hygieneItems')}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('sanitaryAid.donation.items.underwear')}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  {t('sanitaryAid.donation.learnMore')}
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
