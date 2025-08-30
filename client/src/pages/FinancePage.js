import React from 'react';
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
  const upcomingSeminars = [
    {
      id: 1,
      title: 'Women in Business: Starting Your First Investment',
      date: '2025-09-15',
      time: '10:00 AM',
      location: 'Cape Town Community Center',
      facilitator: 'Dr. Nomsa Mbeki',
      description: 'Learn the basics of investment and how to start building wealth for your future.',
      spots: 25,
    },
    {
      id: 2,
      title: 'Financial Independence Workshop',
      date: '2025-09-22',
      time: '2:00 PM',
      location: 'Johannesburg Business Hub',
      facilitator: 'Sarah Williams, CFA',
      description: 'Practical strategies for achieving financial independence as a woman entrepreneur.',
      spots: 15,
    },
    {
      id: 3,
      title: 'Budgeting and Saving for Single Mothers',
      date: '2025-09-28',
      time: '6:00 PM',
      location: 'Durban Women\'s Center',
      facilitator: 'Thandiwe Nkomo',
      description: 'Essential budgeting skills and saving strategies tailored for single mothers.',
      spots: 30,
    },
  ];

  const financialTips = [
    {
      title: 'Start an Emergency Fund',
      description: 'Aim to save at least 3-6 months of living expenses for unexpected situations.',
      category: 'Savings',
    },
    {
      title: 'Invest in Your Education',
      description: 'Financial literacy is your best investment. Learn about different investment options.',
      category: 'Education',
    },
    {
      title: 'Diversify Your Income',
      description: 'Consider multiple income streams to build financial stability and independence.',
      category: 'Income',
    },
    {
      title: 'Plan for Retirement Early',
      description: 'The earlier you start saving for retirement, the more time your money has to grow.',
      category: 'Planning',
    },
    {
      title: 'Track Your Expenses',
      description: 'Understanding where your money goes is the first step to taking control of your finances.',
      category: 'Budgeting',
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Savings': '#4CAF50',
      'Education': '#2196F3',
      'Income': '#FF9800',
      'Planning': '#9C27B0',
      'Budgeting': '#F44336',
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
            Financial Empowerment
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Access tailored financial advice, attend empowering seminars, and build your path to financial independence
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Upcoming Seminars */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              <Event sx={{ mr: 1, verticalAlign: 'middle' }} />
              Upcoming Seminars
            </Typography>
            
            {upcomingSeminars.map((seminar) => (
              <Card key={seminar.id} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                      {seminar.title}
                    </Typography>
                    <Chip
                      label={`${seminar.spots} spots available`}
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
              Financial Tips
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
                  Quick Stats
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    2,500+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Women Empowered
                  </Typography>
                  
                  <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold', mt: 2 }}>
                    150+
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Seminars Conducted
                  </Typography>
                  
                  <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold', mt: 2 }}>
                    85%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Success Rate
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
