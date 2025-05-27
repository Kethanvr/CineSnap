import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import { SEO } from '../components/common';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using CineSnap, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'CineSnap is a free movie discovery platform built for educational and entertainment purposes.'
      ]
    },
    {
      title: 'Use License',
      content: [
        'Permission is granted to temporarily access CineSnap for personal, non-commercial transitory viewing only.',
        'This is the grant of a license, not a transfer of title, and under this license you may not:',
        '• Modify or copy the materials',
        '• Use the materials for any commercial purpose or for any public display',
        '• Attempt to reverse engineer any software contained on the website',
        '• Remove any copyright or other proprietary notations from the materials'
      ]
    },
    {
      title: 'Content and Services',
      content: [
        'CineSnap provides movie information, images, and data sourced from The Movie Database (TMDB):',
        '• All movie data is provided by TMDB and subject to their terms of service',
        '• We do not claim ownership of any movie content, images, or related materials',
        '• Content is provided for informational and entertainment purposes only',
        '• We strive for accuracy but cannot guarantee the completeness of all information'
      ]
    },
    {
      title: 'User Conduct',
      content: [
        'You agree to use CineSnap responsibly and in accordance with all applicable laws:',
        '• Do not attempt to overwhelm our servers with excessive requests',
        '• Do not use automated systems to scrape or download content',
        '• Respect the intellectual property rights of content creators',
        '• Report any bugs or issues to help us improve the service'
      ]
    },
    {
      title: 'Disclaimer',
      content: [
        'The information on CineSnap is provided on an "as is" basis:',
        '• We make no warranties, expressed or implied, and hereby disclaim all other warranties',
        '• We do not warrant that the service will be uninterrupted or error-free',
        '• Movie ratings, reviews, and information are for entertainment purposes only',
        '• Use your own judgment when making viewing decisions'
      ]
    },
    {
      title: 'Limitations',
      content: [
        'In no event shall CineSnap or its developers be liable for any damages:',
        '• This includes damages arising out of the use or inability to use the service',
        '• CineSnap is provided as a free service without warranty',
        '• Maximum liability is limited to the amount you paid to use the service (which is $0)'
      ]
    },
    {
      title: 'Accuracy of Materials',
      content: [
        'The materials appearing on CineSnap could include technical, typographical, or photographic errors:',
        '• We do not warrant that any of the materials are accurate, complete, or current',
        '• We may make changes to the materials at any time without notice',
        '• We do not commit to updating the materials'
      ]
    },
    {
      title: 'Modifications',
      content: [
        'We may revise these terms of service at any time without notice:',
        '• By using CineSnap, you agree to be bound by the current version of these terms',
        '• Changes will be posted on this page with an updated date',
        '• Continued use constitutes acceptance of any modifications'
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Terms of Service"
        description="CineSnap Terms of Service - Read our terms and conditions for using the movie discovery platform."
        keywords="terms of service, terms and conditions, cinesnap terms, movie app terms"
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
              Terms of Service
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
              Welcome to CineSnap! These Terms of Service ("Terms") govern your use of the CineSnap 
              website and services. Please read these Terms carefully before using our platform.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              <strong>The simple version:</strong> CineSnap is a free movie discovery platform. 
              Be respectful, don't break anything, and enjoy discovering great movies!
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

          {/* Additional Information */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
            p: 3,
            borderRadius: 2,
            mb: 4
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              About CineSnap
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              CineSnap is an open-source movie discovery platform built by Kethan VR as a passion 
              project. It's designed to help movie enthusiasts discover new films, explore detailed 
              information, and make informed viewing decisions.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              The platform is provided free of charge and is continuously improved based on user 
              feedback and technological advancements.
            </Typography>
          </Box>

          {/* Contact Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Questions About These Terms?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              If you have any questions about these Terms of Service, please contact us.
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

export default TermsOfService;
