import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import {
  AccountBalance,
  Security,
  LocalHospital,
  SmartToy,
  Assignment,
  Info,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const featureCards = [
  {
    title: 'Financial Support',
    description: 'Access tailored investment advice and attend empowering financial seminars.',
    icon: <AccountBalance sx={{ fontSize: 40 }} />,
    link: '/finance',
    color: '#4CAF50',
  },
  {
    title: 'GBV Support',
    description: 'Find immediate support and safe shelter locations when you need them most.',
    icon: <Security sx={{ fontSize: 40 }} />,
    link: '/gbv-support',
    color: '#F44336',
  },
  {
    title: 'Sanitary Aid',
    description: 'Locate nearby donation bins and access essential hygiene resources.',
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    link: '/sanitary-aid',
    color: '#2196F3',
  },
  {
    title: 'AI Assistant',
    description: 'Get instant answers and guidance from our intelligent support system.',
    icon: <SmartToy sx={{ fontSize: 40 }} />,
    link: '/ai-assistant',
    color: '#9C27B0',
  },
  {
    title: 'Submit Requests',
    description: 'Submit and track your support requests with our easy-to-use system.',
    icon: <Assignment sx={{ fontSize: 40 }} />,
    link: '/requests',
    color: '#FF9800',
  },
  {
    title: 'About Us',
    description: 'Learn more about our mission to empower women across South Africa.',
    icon: <Info sx={{ fontSize: 40 }} />,
    link: '/about',
    color: '#607D8B',
  },
];

const HomePage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          EmpowerHub
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            color: 'text.secondary',
            mb: 2,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
          }}
        >
          Empowering Women with Integrated Support
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontStyle: 'italic',
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          &ldquo;Strengthening independence, safety, and dignity.&rdquo;
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {featureCards.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
                <Button
                  component={Link}
                  to={feature.link}
                  variant="contained"
                  sx={{
                    backgroundColor: feature.color,
                    '&:hover': {
                      backgroundColor: feature.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          px: 3,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Join thousands of women who have found support and empowerment through our platform.
        </Typography>
        <Button
          component={Link}
          to="/requests"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          Submit Your First Request
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
