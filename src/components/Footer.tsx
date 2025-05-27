import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  GitHub,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();

  const sections = [
    {
      title: "Discover",
      links: [
        { text: "Latest Movies", href: "/movies" },
        { text: "Top Rated", href: "/movies/top-rated" },
        { text: "Upcoming", href: "/movies/upcoming" },
        { text: "Now Playing", href: "/movies/now-playing" },
      ],
    },
    {
      title: "Genre",
      links: [
        { text: "Action", href: "/genre/action" },
        { text: "Comedy", href: "/genre/comedy" },
        { text: "Drama", href: "/genre/drama" },
        { text: "Horror", href: "/genre/horror" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Contact", href: "/contact" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
      ],
    },
  ];
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: { xs: 4, md: 6 },
        mt: "auto",
        width: "100%",
        flexShrink: 0,
      }}
    >      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>            <Stack spacing={{ xs: 2, md: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img 
                  src="/logo.png" 
                  alt="CineSnap Logo" 
                  style={{ 
                    height: "2rem", 
                    width: "auto",
                    filter: `hue-rotate(${theme.palette.mode === 'dark' ? '0deg' : '0deg'})` 
                  }} 
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CineSnap
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ lineHeight: 1.6, maxWidth: { md: "90%" } }}
              >
                Your ultimate movie discovery companion. Built with passion by 
                Kethan VR to help you explore cinema like never before.
              </Typography>
              <Stack direction="row" spacing={1} className="social-links">
                <IconButton
                  href="https://github.com/Kethanvr"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label="GitHub"
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <GitHub />
                </IconButton>                <IconButton
                  href="https://x.com/VrKethan"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label="X (Twitter)"
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/kethan-vr-433ab532b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label="LinkedIn"
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://www.youtube.com/@kethanvr"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label="YouTube"
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <YouTube />
                </IconButton>
                <IconButton
                  href="https://www.threads.net/@kethan_vr_"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label="Threads"
                  sx={{
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Instagram />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>          {/* Navigation Sections */}
          {sections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  mb: { xs: 1.5, md: 2 }
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={{ xs: 0.75, md: 1 }}>
                {section.links.map((link) => (
                  <Link
                    key={link.text}
                    component={RouterLink}
                    to={link.href}
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.85rem", md: "0.875rem" },
                      "&:hover": { 
                        color: "primary.main",
                        transform: "translateX(4px)"
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ 
            mt: { xs: 6, md: 8 },
            pt: { xs: 3, md: 4 },
            borderTop: "1px solid",
            borderColor: "divider",
            fontSize: { xs: "0.8rem", md: "0.875rem" }
          }}
        >
          © {new Date().getFullYear()} CineSnap. Built with ❤️ by{" "}
          <Link 
            href="https://github.com/Kethanvr" 
            target="_blank" 
            rel="noopener noreferrer"
            color="primary"
            underline="hover"
          >
            Kethan VR
          </Link>
          . All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
