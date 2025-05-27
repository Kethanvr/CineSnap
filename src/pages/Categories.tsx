import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/movieApi.ts";
import { LocalMovies } from "@mui/icons-material";
import type { Genre } from "../types/movie.ts";

// Genre background images from Unsplash
const genreBackgrounds = {
  Action: "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
  Adventure: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d",
  Animation: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
  Comedy: "https://images.unsplash.com/photo-1543584756-8f40a802e14f",
  Crime: "https://images.unsplash.com/photo-1453873531674-2151bcd01707",
  Documentary: "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb",
  Drama: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
  Family: "https://images.unsplash.com/photo-1511895426328-dc8714191300",
  Fantasy: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
  History: "https://images.unsplash.com/photo-1461360370896-922624d12aa1",
  Horror: "https://images.unsplash.com/photo-1626544827763-d516dce335e2",
  Music: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  Mystery: "https://images.unsplash.com/photo-1519822472072-ec86d5ab6f5c",
  Romance: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00",
  "Science Fiction":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  "TV Movie": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37",
  Thriller: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
  War: "https://images.unsplash.com/photo-1547483238-2cbf88bc56f7",
  Western: "https://images.unsplash.com/photo-1533167649158-6d508895b680",
};

const genreColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Light Blue
  "#8b5cf6", // Purple (replaced green)
  "#FFEEAD", // Light Yellow
  "#D4A5A5", // Rose
  "#9B59B6", // Purple
  "#3498DB", // Blue
  "#1ABC9C", // Turquoise
  "#F1C40F", // Yellow
  "#E74C3C", // Dark Red
  "#6366f1", // Indigo (replaced green)
  "#E67E22", // Orange
  "#95A5A6", // Gray
  "#34495E", // Navy
  "#16A085", // Dark Turquoise
  "#7c3aed", // Violet (replaced dark green)
  "#2980B9", // Dark Blue
  "#8E44AD", // Dark Purple
  "#F39C12", // Dark Orange
];

const Categories = () => {
  const navigate = useNavigate();
  const { data: genres, isLoading } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "primary.main",
            fontWeight: "bold",
          }}
        >
          <LocalMovies />
          Browse Movies by Genre
        </Typography>

        <Grid container spacing={3}>
          {genres?.map((genre, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
              <Card
                onClick={() => navigate(`/genre/${genre.id}`)}
                sx={{
                  height: "200px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  transition: "all 0.3s ease-in-out",
                  transform: "perspective(1000px) rotateY(0deg)",
                  "&:hover": {
                    transform:
                      "perspective(1000px) rotateY(10deg) translateY(-5px)",
                    "& .genre-overlay": {
                      background: `linear-gradient(135deg, ${alpha(
                        genreColors[index % genreColors.length],
                        0.9
                      )}, ${alpha(
                        genreColors[index % genreColors.length],
                        0.7
                      )})`,
                    },
                    "& .genre-content": {
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    genreBackgrounds[
                      genre.name as keyof typeof genreBackgrounds
                    ] ||
                    "https://images.unsplash.com/photo-1485846234645-a62644f84728"
                  }
                  alt={genre.name}
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  className="genre-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${alpha(
                      genreColors[index % genreColors.length],
                      0.8
                    )}, ${alpha(
                      genreColors[index % genreColors.length],
                      0.6
                    )})`,
                    transition: "background 0.3s ease-in-out",
                  }}
                />
                <CardContent
                  className="genre-content"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: "white",
                    transform: "translateY(20px)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    {genre.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
