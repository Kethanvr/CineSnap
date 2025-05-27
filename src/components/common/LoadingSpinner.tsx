import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 48, 
  fullScreen = false 
}: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        minHeight: fullScreen ? '100vh' : '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: fullScreen ? 'background.default' : 'transparent',
      }}
    >
      <CircularProgress size={size} thickness={4} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
