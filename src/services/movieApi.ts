import axios from "axios";
import type { Movie, MovieResponse, Genre } from "../types/movie.ts";
import type { TVShow, TVShowResponse } from "../types/tvshow.ts";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await movieApi.get("/movie/popular", {
    params: { page },
  });
  return {
    ...response.data,
    hasNextPage: page < response.data.total_pages,
  };
};

export const getLatestMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await movieApi.get("/movie/now_playing", {
    params: { page },
  });
  return {
    ...response.data,
    hasNextPage: page < response.data.total_pages,
  };
};

export const getMovieDetails = async (movieId: string): Promise<Movie> => {
  const response = await movieApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos,images,credits,reviews,watch/providers",
    },
  });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page = 1
): Promise<MovieResponse> => {
  const response = await movieApi.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return {
    ...response.data,
    hasNextPage: page < response.data.total_pages,
  };
};

export const getMovieImages = async (movieId: string) => {
  const response = await movieApi.get(`/movie/${movieId}/images`, {
    params: {
      include_image_language: "en,null",
    },
  });
  return response.data;
};

export const getMovieRecommendations = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/movie/recommendations?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getMovieVideos = async (movieId: string) => {
  const response = await movieApi.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

interface GetMoviesByGenreParams {
  page?: number;
  sort_by?: string;
}

export const getMoviesByGenre = async (
  genreId: string,
  params: GetMoviesByGenreParams = {}
) => {
  const { page = 1, sort_by = "popularity.desc" } = params;
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=${sort_by}&language=en-US`
  );
  const data = await response.json();

  // Get genre name
  const genresResponse = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const genresData = await genresResponse.json();
  const genre = genresData.genres.find(
    (g: Genre) => g.id === Number.parseInt(genreId, 10)
  );

  return {
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
    genre_name: genre?.name || "Unknown Genre",
    hasNextPage: page < data.total_pages,
  };
};

export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.genres;
};

export const getTopRatedMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await movieApi.get("/movie/top_rated", {
    params: { page },
  });
  return {
    ...response.data,
    hasNextPage: page < response.data.total_pages,
  };
};

export const getUpcomingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await movieApi.get("/movie/upcoming", {
    params: { page },
  });
  return {
    ...response.data,
    hasNextPage: page < response.data.total_pages,
  };
};

export const getTVShowDetails = async (tvId: string): Promise<TVShow> => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=credits,images,reviews&include_image_language=en,null`
  );
  return response.json();
};

export const getPopularTVShows = async (page = 1): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}&language=en-US`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getTopRatedTVShows = async (page = 1): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}&language=en-US`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getAiringTodayTVShows = async (
  page = 1
): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${page}&language=en-US`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const searchTVShows = async (
  query: string,
  page = 1
): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}&language=en-US`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

interface AccountResponse {
  id: number;
  name: string;
  username: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
}

export const getAccountDetails = async (
  sessionId: string
): Promise<AccountResponse> => {
  const response = await fetch(
    `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
  );
  return response.json();
};

export const getFavoriteMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getFavoriteTVShows = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getWatchlistMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getWatchlistTVShows = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getRatedMovies = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getRatedTVShows = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/rated/tv?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const getTVShowRecommendations = async (
  accountId: number,
  sessionId: string,
  page = 1
): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/tv/recommendations?api_key=${API_KEY}&session_id=${sessionId}&page=${page}&language=en-US`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

interface CreateListResponse {
  status_message: string;
  success: boolean;
  status_code: number;
  list_id: number;
}

export const createList = async (
  sessionId: string,
  name: string,
  description: string
): Promise<CreateListResponse> => {
  const response = await fetch(`${BASE_URL}/list?api_key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      language: "en",
      session_id: sessionId,
    }),
  });
  return response.json();
};

export const getUserLists = async (
  accountId: number,
  sessionId: string,
  page = 1
) => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/lists?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`
  );
  const data = await response.json();
  return {
    ...data,
    hasNextPage: page < data.total_pages,
  };
};

export const addToList = async (
  listId: number,
  mediaId: number,
  mediaType: "movie" | "tv",
  sessionId: string
) => {
  const response = await fetch(
    `${BASE_URL}/list/${listId}/add_item?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_id: mediaId,
        media_type: mediaType,
      }),
    }
  );
  return response.json();
};

export const removeFromList = async (
  listId: number,
  mediaId: number,
  mediaType: "movie" | "tv",
  sessionId: string
) => {
  const response = await fetch(
    `${BASE_URL}/list/${listId}/remove_item?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_id: mediaId,
        media_type: mediaType,
      }),
    }
  );
  return response.json();
};

export const getMovieWatchProviders = async (movieId: string) => {
  const response = await movieApi.get(`/movie/${movieId}/watch/providers`);
  return response.data.results;
};

export const getAvailableRegions = async () => {
  const response = await movieApi.get('/watch/providers/regions');
  return response.data.results;
};

export const determineMovieSuccess = (movie: Movie) => {
  const budget = movie.budget;
  const revenue = movie.revenue;
  
  if (!budget || !revenue) return null;
  
  const roi = (revenue - budget) / budget;
  
  if (roi >= 2.5) return 'Blockbuster';
  if (roi >= 1) return 'Hit';
  return 'Flop';
};

export default movieApi;
