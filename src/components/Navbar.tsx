import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import SearchBar from "./SearchBar.tsx";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Movies", path: "/movies" },
    { text: "Categories", path: "/categories" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  const drawer = (
    <List>
      {navLinks.map((link) => (
        <ListItem
          key={link.text}
          component={Link}
          to={link.path}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={link.text} />
        </ListItem>
      ))}
      <ListItem>
        <SearchBar />
      </ListItem>
      <ListItem>
        <SignedOut>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
            }}
          >
            <SignInButton mode="modal">
              <Button variant="outlined" size="small" fullWidth>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="contained" size="small" fullWidth>
                Sign Up
              </Button>
            </SignUpButton>
          </Box>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "width: 32px; height: 32px;",
              },
            }}
          />
        </SignedIn>
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "linear-gradient(to right, #4f46e5, #3b82f6)",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              "&:hover": {
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
          >
            CineSnap
          </Typography>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.text}
                component={Link}
                to={link.path}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.8)",
                  },
                }}
              >
                {link.text}
              </Typography>
            ))}
            <SearchBar />

            {/* Authentication Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "width: 40px; height: 40px;",
                    },
                  }}
                />
              </SignedIn>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
