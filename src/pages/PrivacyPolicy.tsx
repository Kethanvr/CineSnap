import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import { SEO } from '../components/common';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'We collect minimal information to provide you with the best movie discovery experience:',
        '• Search queries to help you find movies',
        '• Basic usage analytics to improve our service',
        '• No personal information is stored or tracked',
        '• We do not collect email addresses, names, or contact information'
      ]
    },
    {
      title: 'How We Use Information',
      content: [
        'The limited information we collect is used solely to:',
        '• Provide accurate movie search results',
        '• Improve the functionality of CineSnap',
        '• Ensure the application runs smoothly',
        '• We never sell, share, or distribute your information to third parties'
      ]
    },
    {
      title: 'Third-Party Services',
      content: [
        'CineSnap uses The Movie Database (TMDB) API to fetch movie information:',
        '• Movie data, images, and details are provided by TMDB',
        '• Please refer to TMDB\'s privacy policy for their data practices',
        '• We do not have control over TMDB\'s data collection practices'
      ]
    },
    {
      title: 'Cookies and Local Storage',
      content: [
        'We use minimal browser storage to enhance your experience:',
        '• Local storage for caching movie data to improve loading times',
        '• No tracking cookies are used',
        '• You can clear this data anytime through your browser settings'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'We take data security seriously:',
        '• All communications are encrypted using HTTPS',
        '• No sensitive personal data is collected or stored',
        '• The application is hosted on secure, reliable infrastructure'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'You have complete control over your interaction with CineSnap:',
        '• You can stop using the service at any time',
        '• Clear browser cache to remove any locally stored data',
        '• Contact us with any privacy concerns at kethanvr@gmail.com'
      ]
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time:',
        '• Any changes will be posted on this page',
        '• We will update the "Last Updated" date below',
        '• Continued use of CineSnap constitutes acceptance of any changes'
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="CineSnap Privacy Policy - Learn how we handle your data and protect your privacy while using our movie discovery platform."
        keywords="privacy policy, data protection, cinesnap privacy, movie app privacy"
      />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
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
              Privacy Policy
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>

          {/* Introduction */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              At CineSnap, your privacy is extremely important to us. This Privacy Policy explains 
              how we collect, use, and protect your information when you use our movie discovery 
              platform. We believe in transparency and keeping data collection to an absolute minimum.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              <strong>The short version:</strong> We collect very little data, we don't track you, 
              and we don't sell your information to anyone. CineSnap is built with privacy in mind.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Sections */}
          <Stack spacing={4}>
            {sections.map((section, index) => (
              <Box key={section.title}>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'primary.main',
                    mb: 2 
                  }}
                >
                  {index + 1}. {section.title}
                </Typography>
                {section.content.map((paragraph, pIndex) => (
                  <Typography 
                    key={pIndex}
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      fontSize: '1rem', 
                      lineHeight: 1.7,
                      ml: paragraph.startsWith('•') ? 2 : 0,
                      color: paragraph.startsWith('•') ? 'text.secondary' : 'text.primary'
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          {/* Contact Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Questions About This Policy?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact us.
            </Typography>
            <Typography variant="body1">
              Email: <strong>kethanvr@gmail.com</strong>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
