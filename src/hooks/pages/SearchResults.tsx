import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { searchMovies } from "../../services/movieApi.ts";
import { MovieResponse } from "../../types/movie.ts";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  const { data, isLoading } = useQuery<MovieResponse>({
    queryKey: ["search", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  if (!query) {
    return (
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Typography variant="h4" align="center">
          Please enter a search term
        </Typography>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.paper", py: 12 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          Search Results for "{query}"
        </Typography>

        {data?.results?.length === 0 ? (
          <Typography align="center">
            No movies found for your search.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {data?.results?.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 20,
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ aspectRatio: "2/3" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom noWrap>
                      {movie.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Rating
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({movie.vote_count} votes)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SearchResults;
