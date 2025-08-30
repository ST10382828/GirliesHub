import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Info,
  AccountBalance,
  Security,
  LocalHospital,
  SmartToy,
  Group,
  Favorite,
  EmojiEvents,
  TrendingUp,
  Shield,
  HealthAndSafety,
} from '@mui/icons-material';

const AboutPage = () => {
  const features = [
    {
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      title: 'Financial Empowerment',
      description: 'Tailored investment advice, financial seminars, and resources to build economic independence.',
      color: '#4CAF50',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'GBV Support',
      description: 'Immediate support and safe shelter locations for women experiencing gender-based violence.',
      color: '#F44336',
    },
    {
      icon: <LocalHospital sx={{ fontSize: 40 }} />,
      title: 'Sanitary Aid',
      description: 'Access to essential hygiene products through strategically located donation bins.',
      color: '#2196F3',
    },
  ];

  const stats = [
    { number: '2,500+', label: 'Women Empowered', icon: <Group /> },
    { number: '150+', label: 'Seminars Conducted', icon: <EmojiEvents /> },
    { number: '50+', label: 'Shelter Locations', icon: <Shield /> },
    { number: '100+', label: 'Donation Bins', icon: <HealthAndSafety /> },
  ];

  const values = [
    {
      title: 'Empowerment',
      description: 'We believe in strengthening women\'s independence through education, resources, and support.',
    },
    {
      title: 'Safety',
      description: 'Ensuring immediate access to safe spaces and support for women in crisis situations.',
    },
    {
      title: 'Dignity',
      description: 'Providing essential resources while maintaining the dignity and privacy of every woman.',
    },
    {
      title: 'Community',
      description: 'Building a strong network of support through community-driven initiatives and partnerships.',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Info sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            About EmpowerHub
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            EmpowerHub empowers women in South Africa by offering tailored investment advice and seminars, 
            immediate GBV support with safe shelter locations, and access to sanitary donation bins. 
            This integrated solution demonstrates our commitment to strengthening independence, safety, and dignity.
          </Typography>
        </Box>

        {/* Mission Statement */}
        <Card sx={{ mb: 6, background: 'linear-gradient(135deg, #E91E63 0%, #AD1457 100%)' }}>
          <CardContent sx={{ p: 4, color: 'white', textAlign: 'center' }}>
            <Favorite sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="h6" sx={{ lineHeight: 1.6, opacity: 0.95, maxWidth: 800, mx: 'auto' }}>
              &ldquo;To create an integrated platform that empowers women across South Africa by providing 
              comprehensive support services that address financial independence, personal safety, 
              and basic hygiene needs in one accessible solution.&rdquo;
            </Typography>
          </CardContent>
        </Card>

        {/* Core Features */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Our Core Services
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ color: feature.color, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics */}
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
              Our Impact
            </Typography>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Values */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Our Values
          </Typography>
          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technology & Future */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SmartToy sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Technology & Innovation
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              EmpowerHub leverages modern technology to provide an integrated support platform. 
              Our current demo showcases the user interface and core functionality, with plans 
              to integrate advanced features including:
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Current Features
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Responsive web interface" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Request submission system" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Resource location mapping" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText primary="AI assistant interface" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Future Development
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SmartToy color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="AI-powered support & recommendations" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SmartToy color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Blockchain integration with BlockDAG" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SmartToy color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Database persistence & analytics" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SmartToy color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="MetaMask integration for secure transactions" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
              This demo showcases the integrated solution concept, designed to allow independent development 
              of features while maintaining a cohesive user experience. The modular architecture enables 
              future enhancements without disrupting core functionality.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AboutPage;
