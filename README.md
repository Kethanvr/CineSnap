# Movie App

A modern React application for browsing movies using the TMDB API.

## Features

- Browse popular movies
- Search for movies
- View movie details
- Responsive design
- Modern UI with Material-UI

## Tech Stack

- React 18
- TypeScript
- Vite
- React Query
- Material-UI
- React Router
- Axios

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file and add your TMDB API key:

   ```bash
   cp .env.example .env
   ```

   Get your API key from [TMDB](https://www.themoviedb.org/documentation/api)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API services
├── styles/        # Theme and global styles
├── types/         # TypeScript types
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── assets/        # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
