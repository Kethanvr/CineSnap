
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Stack,
  IconButton,
  Chip,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  YouTube,
  Twitter,
  Instagram,
} from '@mui/icons-material';
import { SEO } from '../components/common';

const About = () => {
  const socialLinks = [
    {
      icon: <GitHub />,
      label: 'GitHub',
      url: 'https://github.com/Kethanvr',
    },
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/kethan-vr-433ab532b',
    },
    {
      icon: <YouTube />,
      label: 'YouTube',
      url: 'https://youtube.com/@kethanvr',
    },
    {
      icon: <Twitter />,
      label: 'X (Twitter)',
      url: 'https://x.com/VrKethan',
    },
    {
      icon: <Instagram />,
      label: 'Threads',
      url: 'https://threads.net/@kethan_vr_',
    },
  ];

  const technologies = [
    'React',
    'TypeScript',
    'Material-UI',
    'Vite',
    'React Query',
    'React Router',
    'Web Development',
    'UI/UX Design',
    'AI Integration',
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about CineSnap and Kethan VR, the passionate developer behind this movie discovery platform."
        keywords="about cinesnap, kethan vr, movie app developer, web development"
      />
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 }, minHeight: 'calc(100vh - 200px)' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Avatar
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                mx: 'auto',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3rem' },
                bgcolor: 'primary.main',
                boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
              }}
            >
              KV
            </Avatar>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              🧠 About CineSnap
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Where innovation meets purpose
            </Typography>
          </Box>

          {/* Main Content */}
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Box>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: { xs: '1rem', md: '1.1rem' }, 
                  lineHeight: 1.8 
                }}
              >
                Welcome to <strong>CineSnap</strong> – where innovation meets purpose.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Built by <strong>Kethan VR</strong>, a passionate software developer and tech enthusiast, 
                this platform is a reflection of creativity, learning, and a constant drive to solve 
                real-world problems using technology. Whether it's an AI-powered tool, a responsive 
                web app, or an educational resource, everything here is designed with precision, 
                simplicity, and the end-user in mind.
              </Typography>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                I'm a developer who believes in building things that matter. With a background in 
                web development, UI/UX design, and AI integration, I focus on crafting powerful 
                digital solutions that are accessible, functional, and future-ready.
              </Typography>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                This site is not just a showcase of my projects – it's a step towards creating 
                meaningful impact through tech. Whether you're a fellow dev, a startup, or just 
                curious about what I do, feel free to explore, connect, and collaborate!
              </Typography>

              <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                Let's build the future together ✨
              </Typography>
            </Box>

            {/* Technologies */}
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Technologies & Skills
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
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
            </Box>

            {/* Social Links */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Connect With Me
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                    sx={{
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default About;
