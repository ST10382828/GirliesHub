import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Event,
  LocationOn,
  Person,
  AccessTime,
} from '@mui/icons-material';

const FinancePage = () => {
  const { t } = useTranslation();
  const getUpcomingSeminars = () => [
    {
      id: 1,
      title: t('finance.seminars.seminar1.title'),
      date: '2025-09-15',
      time: t('finance.seminars.seminar1.time'),
      location: t('finance.seminars.seminar1.location'),
      facilitator: t('finance.seminars.seminar1.facilitator'),
      description: t('finance.seminars.seminar1.description'),
      spots: 25,
    },
    {
      id: 2,
      title: t('finance.seminars.seminar2.title'),
      date: '2025-09-22',
      time: t('finance.seminars.seminar2.time'),
      location: t('finance.seminars.seminar2.location'),
      facilitator: t('finance.seminars.seminar2.facilitator'),
      description: t('finance.seminars.seminar2.description'),
      spots: 15,
    },
    {
      id: 3,
      title: t('finance.seminars.seminar3.title'),
      date: '2025-09-28',
      time: t('finance.seminars.seminar3.time'),
      location: t('finance.seminars.seminar3.location'),
      facilitator: t('finance.seminars.seminar3.facilitator'),
      description: t('finance.seminars.seminar3.description'),
      spots: 30,
    },
  ];
  
  const [seminars, setSeminars] = useState([]);
  
  // Update seminars when language changes
  useEffect(() => {
    setSeminars(getUpcomingSeminars());
  }, [t]);

  const getFinancialTips = () => [
    {
      title: t('finance.tips.emergencyFund.title'),
      description: t('finance.tips.emergencyFund.description'),
      category: t('finance.categories.savings'),
    },
    {
      title: t('finance.tips.education.title'),
      description: t('finance.tips.education.description'),
      category: t('finance.categories.education'),
    },
    {
      title: t('finance.tips.diversifyIncome.title'),
      description: t('finance.tips.diversifyIncome.description'),
      category: t('finance.categories.income'),
    },
    {
      title: t('finance.tips.retirement.title'),
      description: t('finance.tips.retirement.description'),
      category: t('finance.categories.planning'),
    },
    {
      title: t('finance.tips.trackExpenses.title'),
      description: t('finance.tips.trackExpenses.description'),
      category: t('finance.categories.budgeting'),
    },
  ];
  
  const financialTips = getFinancialTips();

  const getCategoryColor = (category) => {
    const colors = {
      [t('finance.categories.savings')]: '#4CAF50',
      [t('finance.categories.education')]: '#2196F3',
      [t('finance.categories.income')]: '#FF9800',
      [t('finance.categories.planning')]: '#9C27B0',
      [t('finance.categories.budgeting')]: '#F44336',
    };
    return colors[category] || '#757575';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <AccountBalance sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {t('finance.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('finance.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Upcoming Seminars */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Event sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('finance.upcomingSeminars')}
            </Typography>
            
            {seminars.map((seminar) => (
              <Card key={seminar.id} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                      {seminar.title}
                    </Typography>
                    <Chip
                      label={`${seminar.spots} ${t('finance.spotsAvailable')}`}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {seminar.description}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Event sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {new Date(seminar.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{seminar.time}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{seminar.location}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{seminar.facilitator}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Financial Tips */}
          <Grid item xs={12} lg={4}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              {t('finance.financialTips')}
            </Typography>
            
            <Card>
              <CardContent sx={{ p: 0 }}>
                <List>
                  {financialTips.map((tip, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                              sx={{
                                bgcolor: getCategoryColor(tip.category),
                                width: 32,
                                height: 32,
                                fontSize: '0.875rem',
                              }}
                            >
                              {tip.category[0]}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {tip.title}
                              </Typography>
                            }
                          />
                          <Chip
                            label={tip.category}
                            size="small"
                            sx={{
                              bgcolor: getCategoryColor(tip.category),
                              color: 'white',
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ pl: 5 }}>
                          {tip.description}
                        </Typography>
                      </ListItem>
                      {index < financialTips.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {t('finance.quickStats')}
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    2,500+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t('finance.womenEmpowered')}
                  </Typography>
                  
                  <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold', mt: 2 }}>
                    150+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t('finance.seminarsCompleted')}
                  </Typography>
                  
                  <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold', mt: 2 }}>
                    85%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('finance.successRate')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FinancePage;
