import { Box, Breadcrumbs, Link, Typography, useTheme, useMediaQuery } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  sx?: object;
}

const BreadcrumbNav = ({ items = [], sx = {} }: BreadcrumbNavProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/', icon: <Home sx={{ fontSize: '1rem' }} /> }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Generate human-readable labels
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'movie' && pathSegments[index + 1]) {
        label = 'Movie Details';
      } else if (segment === 'genre' && pathSegments[index + 1]) {
        label = 'Genre Movies';
      } else if (segment === 'search') {
        label = 'Search Results';
      }
      
      // Don't add path for the current page or ID segments
      const isCurrentPage = index === pathSegments.length - 1;
      const isIdSegment = /^\d+$/.test(segment);
      
      if (!isIdSegment) {
        breadcrumbs.push({
          label,
          path: isCurrentPage ? undefined : currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;
  return (
    <Box sx={{ mb: { xs: 2, sm: 3 }, px: { xs: 2, sm: 0 }, ...sx }}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: 'text.secondary',
          },
          '& .MuiBreadcrumbs-ol': {
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: isMobile ? 'auto' : 'visible',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;
          
          if (isLast || !item.path) {
            return (
              <Typography
                key={item.label}
                color="text.primary"
                variant={isMobile ? 'body2' : 'body1'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: isLast ? 600 : 400,
                  whiteSpace: 'nowrap',
                  minWidth: 'max-content',
                }}
              >
                {item.icon}
                {isMobile && !isFirst && item.label.length > 12 
                  ? `${item.label.slice(0, 12)}...` 
                  : item.label
                }
              </Typography>
            );
          }

          return (
            <Link
              key={item.label}
              component={RouterLink}
              to={item.path}
              underline="hover"
              color="text.secondary"
              variant={isMobile ? 'body2' : 'body1'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                whiteSpace: 'nowrap',
                minWidth: 'max-content',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.icon}
              {isMobile && !isFirst && item.label.length > 12 
                ? `${item.label.slice(0, 12)}...` 
                : item.label
              }
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNav;
