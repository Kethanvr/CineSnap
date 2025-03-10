import {
  Card,
  CardMedia,
  Typography,
  Box,
  Rating,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie.ts";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&:hover .movie-info": {
          transform: "translateY(0)",
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="400"
          image={imageUrl}
          alt={movie.title}
          sx={{
            objectFit: "cover",
          }}
        />
        <Box
          className="movie-info"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            p: 2,
            transform: "translateY(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Typography variant="h6" gutterBottom noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              opacity: 0.8,
            }}
          >
            {movie.overview}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
