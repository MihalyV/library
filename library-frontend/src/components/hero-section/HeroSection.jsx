import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Stack,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StarIcon from "@mui/icons-material/Star";

function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/kereses?query=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/kereses");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const mockBooks = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      color: "#1e3a2f",
      accent: "#4ca38d",
    },
    {
      id: 2,
      title: "A gyűrűk ura",
      author: "J.R.R. Tolkien",
      color: "#1a2e3b",
      accent: "#3b82f6",
    },
    {
      id: 3,
      title: "Dűne",
      author: "Frank Herbert",
      color: "#2e2a1a",
      accent: "#eab308",
    },
    {
      id: 4,
      title: "Száz év magány",
      author: "Gabriel García Márquez",
      color: "#2e1a2a",
      accent: "#a855f7",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        color: "white",
        backgroundColor: "#0a1410",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1481627526605-594d3f93ad5b?auto=format&fit=crop&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "-8rem",
          left: "-8rem",
          width: "32rem",
          height: "32rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(76,163,141,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10rem",
          right: "5rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(76,163,141,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(76,163,141,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,163,141,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 2,
          py: "5rem",
          px: { xs: "1.5rem", md: "5rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            gap: { xs: "4rem", lg: "6rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            <Chip
              icon={
                <AutoStoriesIcon
                  style={{ color: "#4ca38d", fontSize: "1rem" }}
                />
              }
              label="Digitális Könyvtár"
              sx={{
                mb: "2rem",
                backgroundColor: "rgba(76,163,141,0.1)",
                color: "#7eddc8",
                borderRadius: "2rem",
                border: "0.05rem solid rgba(76,163,141,0.35)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.03rem",
                px: "0.25rem",
                "& .MuiChip-icon": { color: "#4ca38d" },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.4rem", md: "3.6rem" },
                lineHeight: 1.15,
                mb: "1.5rem",
                fontFamily: "serif",
                letterSpacing: "-0.02rem",
              }}
            >
              Fedezze fel a{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #4ca38d 0%, #7eddc8 50%, #4ca38d 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                tudás végtelen
              </Box>{" "}
              világát
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                maxWidth: "35rem",
                mb: "3rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
              }}
            >
              Böngésszen könyvtárunk gazdag gyűjteményében, keressen rá
              kedvenc szerzőire, és kölcsönözzön egyszerűen online.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing="0.75rem"
              sx={{ mb: "3.5rem", width: "100%" }}
            >
              <Box
                sx={{
                  flex: 1,
                  maxWidth: { sm: "30rem" },
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "0.875rem",
                  border: "0.05rem solid rgba(76,163,141,0.2)",
                  transition:
                    "border-color 0.25s ease, background-color 0.25s ease",
                  "&:focus-within": {
                    borderColor: "rgba(76,163,141,0.6)",
                    backgroundColor: "rgba(255,255,255,0.07)",
                  },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Keresés cím, szerző vagy ISBN alapján..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      borderRadius: "0.875rem",
                      height: "3.5rem",
                      fontSize: "0.95rem",
                      "& fieldset": { border: "none" },
                    },
                  }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleSearch}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #4ca38d 0%, #3d8270 100%)",
                  color: "#0a1410",
                  px: "2rem",
                  height: "3.5rem",
                  borderRadius: "0.875rem",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5ab89f 0%, #4a9a85 100%)",
                  },
                }}
              >
                Keresés
              </Button>
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "0.75rem",
              }}
            >
              {[
                {
                  icon: (
                    <MenuBookIcon
                      sx={{ fontSize: "1.3rem", color: "#4ca38d" }}
                    />
                  ),
                  label: "10 000+ könyv",
                },
                {
                  icon: (
                    <PeopleIcon
                      sx={{ fontSize: "1.3rem", color: "#4ca38d" }}
                    />
                  ),
                  label: "5 000+ olvasó",
                },
                {
                  icon: (
                    <SecurityIcon
                      sx={{ fontSize: "1.3rem", color: "#4ca38d" }}
                    />
                  ),
                  label: "Biztonságos rendszer",
                },
              ].map(({ icon, label }) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    px: "1rem",
                    py: "0.6rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "rgba(76,163,141,0.07)",
                    border: "0.05rem solid rgba(76,163,141,0.15)",
                  }}
                >
                  {icon}
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flex: "0 0 auto",
              width: { lg: "26rem", xl: "30rem" },
              display: { xs: "none", lg: "flex" },
              position: "relative",
              height: "32rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "18rem",
                backgroundColor: "rgba(15,30,24,0.95)",
                borderRadius: "1.25rem",
                border: "0.05rem solid rgba(76,163,141,0.25)",
                boxShadow: "0 1.5rem 4rem rgba(0,0,0,0.6)",
                p: "1.5rem",
                top: "50%",
                left: "50%",
                transform: "translate(-55%, -50%) rotate(-2deg)",
                zIndex: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1rem",
                  textTransform: "uppercase",
                  color: "#4ca38d",
                  mb: "1rem",
                }}
              >
                Népszerű most
              </Typography>
              {mockBooks.map((book, i) => (
                <Box
                  key={book.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    p: "0.75rem",
                    borderRadius: "0.75rem",
                    mb: "0.5rem",
                    backgroundColor:
                      i === 0
                        ? "rgba(76,163,141,0.12)"
                        : "rgba(255,255,255,0.03)",
                    border: `0.05rem solid ${i === 0 ? "rgba(76,163,141,0.3)" : "rgba(255,255,255,0.05)"}`,
                  }}
                >
                  <Box
                    sx={{
                      width: "2.5rem",
                      height: "3.5rem",
                      borderRadius: "0.4rem",
                      backgroundColor: book.color,
                      border: `0.15rem solid ${book.accent}33`,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AutoStoriesIcon
                      sx={{ fontSize: "1rem", color: book.accent }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.7rem",
                      }}
                    >
                      {book.author}
                    </Typography>
                  </Box>
                  {i === 0 && (
                    <Box sx={{ ml: "auto", flexShrink: 0 }}>
                      <StarIcon
                        sx={{ fontSize: "0.9rem", color: "#eab308" }}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;