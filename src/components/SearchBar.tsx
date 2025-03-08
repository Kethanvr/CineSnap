import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, InputBase, IconButton, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: { xs: "100%", sm: 300 },
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: "2px 8px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.2s ease-in-out",
          "&:hover, &:focus-within": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
          },
        }}
      >
        <InputBase
          inputRef={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies.."
          sx={{
            ml: 1,
            flex: 1,
            color: "text.primary",
            "& input": {
              color: "text.primary",
              "&::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
              },
            },
            "& .MuiInputBase-input": {
              py: 1,
              fontSize: "0.95rem",
            },
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: 1,
            color: "primary.main",
            "&:hover": {
              color: "primary.light",
              bgcolor: "rgba(99, 102, 241, 0.08)",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
