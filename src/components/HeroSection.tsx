import { Box, Container, Typography } from "@mui/material";
import SearchBar from "./SearchBar.tsx";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
        backgroundImage:
          "url('https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // Overlay removed
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          animation: "fadeIn 2s ease-out",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Discover Your Favorite Movies
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            mb: 4,
            maxWidth: "600px",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            opacity: 0.9,
          }}
        >
          All movie details, high-quality images, and streaming options in one
          place.
        </Typography>
        <Box sx={{ width: { xs: "90%", sm: "400px" } }}>
          <SearchBar />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
