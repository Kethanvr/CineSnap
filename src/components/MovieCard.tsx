import {
  Card,
  CardMedia,
  Typography,
  Box,
  Rating,
  CardActionArea,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie.ts";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  if (isMobile) {
    // Enhanced mobile layout with better UX and info visibility
    return (
      <Card
        sx={{
          height: "100%",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          borderRadius: 2,
          overflow: "hidden",
          "&:active": {
            transform: "scale(0.97)",
          },
          "&:hover": {
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardActionArea 
          onClick={() => navigate(`/movie/${movie.id}`)}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ position: "relative", width: "100%" }}>
            <CardMedia
              component="img"
              height="280"
              image={imageUrl}
              alt={movie.title}
              sx={{
                objectFit: "cover",
                width: "100%",
              }}
            />
            {/* Rating badge overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0, 0, 0, 0.8)",
                borderRadius: 1,
                px: 1,
                py: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Rating
                value={movie.vote_average / 2}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  "& .MuiRating-icon": {
                    fontSize: "0.875rem",
                  },
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "white", 
                  fontWeight: 600,
                  fontSize: "0.75rem"
                }}
              >
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          </Box>
          
          <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.4,
                minHeight: "2.8em",
                fontSize: "0.95rem",
              }}
            >
              {movie.title}
            </Typography>
            
            {/* Release year */}
            {movie.release_date && (
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                {new Date(movie.release_date).getFullYear()}
              </Typography>
            )}
            
            {/* Overview snippet for better info visibility */}
            {movie.overview && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.3,
                  fontSize: "0.8rem",
                  opacity: 0.8,
                  mt: "auto",
                }}
              >
                {movie.overview}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  // Desktop layout with hover overlay
  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => theme.shadows[8],
          "& .movie-info": {
            transform: "translateY(0)",
          },
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
            bgcolor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
            p: 2,
            transform: "translateY(100%)",
            transition: "transform 0.3s ease-in-out",
            color: "white",
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom 
            noWrap
            sx={{ fontWeight: 600 }}
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              size="small"
              readOnly
              sx={{
                "& .MuiRating-icon": {
                  color: "#FFD700",
                },
              }}
            />
            <Typography variant="body2" sx={{ ml: 1, color: "white" }}>
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              opacity: 0.9,
              lineHeight: 1.4,
            }}
          >
            {movie.overview || "No description available."}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
