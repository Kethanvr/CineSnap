import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';
import {
  Email,
  GitHub,
  LinkedIn,
  YouTube,
  Twitter,
  Instagram,
  Schedule,
} from '@mui/icons-material';
import { SEO } from '../components/common';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Email />,
      title: 'Email',
      value: 'kethanvr@gmail.com',
      link: 'mailto:kethanvr@gmail.com',
      primary: true,
    },
    {
      icon: <GitHub />,
      title: 'GitHub',
      value: 'github.com/Kethanvr',
      link: 'https://github.com/Kethanvr',
    },
    {
      icon: <LinkedIn />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/kethan-vr-433ab532b',
      link: 'https://linkedin.com/in/kethan-vr-433ab532b',
    },
    {
      icon: <YouTube />,
      title: 'YouTube',
      value: '@kethanvr',
      link: 'https://youtube.com/@kethanvr',
    },
    {
      icon: <Twitter />,
      title: 'X (Twitter)',
      value: '@VrKethan',
      link: 'https://x.com/VrKethan',
    },
    {
      icon: <Instagram />,
      title: 'Threads',
      value: '@kethan_vr_',
      link: 'https://threads.net/@kethan_vr_',
    },
  ];

  const topics = [
    'Collaboration Ideas',
    'Project Discussions',
    'Technical Questions',
    'Feedback & Suggestions',
    'Job Opportunities',
    'Open Source Contributions',
    'Just Say Hi!',
  ];

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Kethan VR. Let's collaborate, discuss projects, or just connect!"
        keywords="contact kethan vr, collaboration, developer contact, cinesnap contact"
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            📬 Contact
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Got a question, collaboration idea, or just wanna say hey?
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
            I'd love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Methods */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(156, 39, 176, 0.02) 100%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                Let's Connect
              </Typography>
              
              <Grid container spacing={3}>
                {contactMethods.map((method) => (
                  <Grid item xs={12} sm={6} key={method.title}>
                    <Card
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: method.primary ? '2px solid' : '1px solid',
                        borderColor: method.primary ? 'primary.main' : 'divider',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                          borderColor: 'primary.main',
                        },
                      }}
                      onClick={() => window.open(method.link, '_blank')}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <IconButton
                            sx={{
                              bgcolor: method.primary ? 'primary.main' : 'primary.light',
                              color: method.primary ? 'white' : 'primary.main',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white',
                              },
                            }}
                          >
                            {method.icon}
                          </IconButton>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {method.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ wordBreak: 'break-all' }}
                            >
                              {method.value}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Additional Info */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Availability */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Schedule color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Availability
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  I'm usually online! Feel free to reach out anytime and I'll get back to you as soon as possible.
                </Typography>
              </Paper>

              {/* Topics */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  What can we talk about?
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {topics.map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      size="small"
                      variant="outlined"
                      sx={{
                        mb: 1,
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderColor: 'primary.main',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Paper>

              {/* Fun Fact */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  💡 Fun Fact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  I built CineSnap because I was tired of spending 30 minutes trying to find something to watch on streaming platforms!
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
