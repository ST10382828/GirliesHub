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
  const { t } = useTranslation();
  
  const safeShelters = [
    {
      id: 1,
      name: t('gbvSupport.safeShelters.locations.safeHaven.name'),
      address: t('gbvSupport.safeShelters.locations.safeHaven.address'),
      phone: t('gbvSupport.safeShelters.locations.safeHaven.phone'),
      emergency: t('gbvSupport.safeShelters.locations.safeHaven.emergency'),
      capacity: t('gbvSupport.safeShelters.capacity.available'),
      services: [t('gbvSupport.safeShelters.services.emergencyAccommodation'), t('gbvSupport.safeShelters.services.counseling'), t('gbvSupport.safeShelters.services.legalSupport'), t('gbvSupport.safeShelters.services.jobTraining')],
      operatingHours: t('gbvSupport.safeShelters.locations.safeHaven.hours'),
      description: t('gbvSupport.safeShelters.locations.safeHaven.description'),
    },
    {
      id: 2,
      name: t('gbvSupport.safeShelters.locations.ubuntu.name'),
      address: t('gbvSupport.safeShelters.locations.ubuntu.address'),
      phone: t('gbvSupport.safeShelters.locations.ubuntu.phone'),
      emergency: t('gbvSupport.safeShelters.locations.ubuntu.emergency'),
      capacity: t('gbvSupport.safeShelters.capacity.limited'),
      services: [t('gbvSupport.safeShelters.services.safeHousing'), t('gbvSupport.safeShelters.services.traumaCounseling'), t('gbvSupport.safeShelters.services.legalAid'), t('gbvSupport.safeShelters.services.childrenSupport')],
      operatingHours: t('gbvSupport.safeShelters.locations.ubuntu.hours'),
      description: t('gbvSupport.safeShelters.locations.ubuntu.description'),
    },
    {
      id: 3,
      name: t('gbvSupport.safeShelters.locations.themba.name'),
      address: t('gbvSupport.safeShelters.locations.themba.address'),
      phone: t('gbvSupport.safeShelters.locations.themba.phone'),
      emergency: t('gbvSupport.safeShelters.locations.themba.emergency'),
      capacity: t('gbvSupport.safeShelters.capacity.available'),
      services: [t('gbvSupport.safeShelters.services.emergencyShelter'), t('gbvSupport.safeShelters.services.medicalSupport'), t('gbvSupport.safeShelters.services.courtSupport'), t('gbvSupport.safeShelters.services.skillsDevelopment')],
      operatingHours: t('gbvSupport.safeShelters.locations.themba.hours'),
      description: t('gbvSupport.safeShelters.locations.themba.description'),
    },
  ];

  const emergencyContacts = [
    {
      name: t('gbvSupport.emergencyContacts.contacts.gbvCommand.name'),
      number: t('gbvSupport.emergencyContacts.contacts.gbvCommand.number'),
      description: t('gbvSupport.emergencyContacts.contacts.gbvCommand.description'),
      type: 'emergency'
    },
    {
      name: t('gbvSupport.emergencyContacts.contacts.police.name'),
      number: t('gbvSupport.emergencyContacts.contacts.police.number'),
      description: t('gbvSupport.emergencyContacts.contacts.police.description'),
      type: 'emergency'
    },
    {
      name: t('gbvSupport.emergencyContacts.contacts.lifeline.name'),
      number: t('gbvSupport.emergencyContacts.contacts.lifeline.number'),
      description: t('gbvSupport.emergencyContacts.contacts.lifeline.description'),
      type: 'support'
    },
    {
      name: t('gbvSupport.emergencyContacts.contacts.childline.name'),
      number: t('gbvSupport.emergencyContacts.contacts.childline.number'),
      description: t('gbvSupport.emergencyContacts.contacts.childline.description'),
      type: 'support'
    }
  ];

  const getCapacityColor = (capacity) => {
    const available = t('gbvSupport.safeShelters.capacity.available').toLowerCase();
    const limited = t('gbvSupport.safeShelters.capacity.limited').toLowerCase();
    const full = t('gbvSupport.safeShelters.capacity.full').toLowerCase();
    
    switch (capacity.toLowerCase()) {
      case available:
        return 'success';
      case limited:
        return 'warning';
      case full:
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
            {t('gbvSupport.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            {t('gbvSupport.subtitle')}
          </Typography>
        </Box>

        {/* Emergency Alert */}
        <Alert 
          severity="error" 
          sx={{ mb: 4, fontSize: '1.1rem' }}
          icon={<Warning />}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {t('gbvSupport.emergencyAlert.title')}
          </Typography>
          <Typography>
            {t('gbvSupport.emergencyAlert.description')}
          </Typography>
        </Alert>

        <Grid container spacing={4}>
          {/* Safe Shelters */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Home sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('gbvSupport.safeShelters.title')}
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
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t('gbvSupport.safeShelters.address')}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{shelter.address}</Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AccessTime sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{t('gbvSupport.safeShelters.hours')}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ ml: 3 }}>{shelter.operatingHours}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>{t('gbvSupport.safeShelters.contactNumbers')}</Typography>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2">
                            <Phone sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                            {t('gbvSupport.safeShelters.general')}: {shelter.phone}
                          </Typography>
                          <Typography variant="body2" color="error.main" sx={{ fontWeight: 'bold' }}>
                            <EmergencyShare sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                            {t('gbvSupport.safeShelters.emergency')}: {shelter.emergency}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>{t('gbvSupport.safeShelters.servicesAvailable')}</Typography>
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
                      {t('gbvSupport.safeShelters.emergencyCall')}
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Phone />}
                      href={`tel:${shelter.phone}`}
                    >
                      {t('gbvSupport.safeShelters.generalContact')}
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
              {t('gbvSupport.emergencyContacts.title')}
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
                            {t('gbvSupport.emergencyContacts.callNow')}
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
                  {t('gbvSupport.legalResources.title')}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Gavel fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('gbvSupport.legalResources.legalAid.name')} 
                      secondary={t('gbvSupport.legalResources.legalAid.description')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalHospital fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('gbvSupport.legalResources.medicalSupport.name')} 
                      secondary={t('gbvSupport.legalResources.medicalSupport.description')}
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
