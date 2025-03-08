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
  Movie,
} from "@mui/icons-material";

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
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Movie sx={{ color: "primary.main", fontSize: "2rem" }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CineSnap
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Your ultimate destination for movie discovery. Find the latest
                releases, reviews, and high-quality movie content all in one
                place.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <Instagram />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Navigation Sections */}
          {sections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Powered By
            </Typography>
            <Link
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "block",
                mt: 1,
                img: {
                  width: "100px",
                  height: "auto",
                },
              }}
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                alt="TMDB"
              />
            </Link>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8 }}
        >
          © {new Date().getFullYear()} CineSnap. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
