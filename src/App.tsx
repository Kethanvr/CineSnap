import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import theme from "./styles/theme";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const SearchResults = React.lazy(() => import("./pages/SearchResults"));
const MovieImages = React.lazy(() => import("./pages/MovieImages"));
const Movies = React.lazy(() => import("./pages/Movies"));
const MovieCast = React.lazy(() => import("./pages/MovieCast"));
const MovieReviews = React.lazy(() => import("./pages/MovieReviews"));
const MovieTrailers = React.lazy(() => import("./pages/MovieTrailers"));
const GenreMovies = React.lazy(() => import("./pages/GenreMovies"));
const TopRatedMovies = React.lazy(() => import("./pages/TopRatedMovies"));
const UpcomingMovies = React.lazy(() => import("./pages/UpcomingMovies"));
const Categories = React.lazy(() => import("./pages/Categories"));
const MovieInfo = React.lazy(() => import("./pages/MovieInfo"));
const ProductionCompanies = React.lazy(
  () => import("./pages/ProductionCompanies")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
            }}
          >
            <Navbar />
            <Box
              component="main"
              sx={{
                flex: 1,
                pt: { xs: 7, sm: 8 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <React.Suspense
                fallback={
                  <Box
                    sx={{
                      height: "100vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={48} thickness={4} />
                  </Box>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route
                    path="/movies/top-rated"
                    element={<TopRatedMovies />}
                  />
                  <Route path="/movies/upcoming" element={<UpcomingMovies />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/genre/:id" element={<GenreMovies />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/movie/:id/images" element={<MovieImages />} />
                  <Route path="/movie/:id/cast" element={<MovieCast />} />
                  <Route path="/movie/:id/reviews" element={<MovieReviews />} />
                  <Route
                    path="/movie/:id/trailers"
                    element={<MovieTrailers />}
                  />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/movie/:id/info" element={<MovieInfo />} />
                  <Route
                    path="/movie/:id/companies"
                    element={<ProductionCompanies />}
                  />
                </Routes>
              </React.Suspense>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
