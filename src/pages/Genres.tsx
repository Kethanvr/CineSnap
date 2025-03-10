import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Skeleton,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/movieApi.ts";
import { LocalMovies } from "@mui/icons-material";
import type { Genre } from "../types/movie.ts";

const genreColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#1ABC9C",
  "#F1C40F",
  "#E74C3C",
  "#2ECC71",
  "#E67E22",
  "#95A5A6",
  "#34495E",
  "#16A085",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
  "#F39C12",
];

const Genres = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: genres, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`skeleton-genre-${index}-${Date.now()}`}
            >
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "primary.main",
          }}
        >
          <LocalMovies />
          Browse Movies by Genre
        </Typography>

        <Grid container spacing={3}>
          {genres?.map((genre: Genre, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={genre.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  background: `linear-gradient(135deg, ${
                    genreColors[index % genreColors.length]
                  }, ${alpha(genreColors[index % genreColors.length], 0.8)})`,
                  transition: "all 0.3s ease-in-out",
                  transform: "perspective(1000px) rotateY(0deg)",
                  "&:hover": {
                    transform:
                      "perspective(1000px) rotateY(10deg) translateY(-5px)",
                    boxShadow: theme.shadows[10],
                  },
                }}
                onClick={() => navigate(`/genre/${genre.id}`)}
              >
                <CardContent
                  sx={{
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                      mb: 2,
                    }}
                  >
                    {genre.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, fontStyle: "italic" }}
                  >
                    Click to explore {genre.name.toLowerCase()} movies
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

export default Genres;
