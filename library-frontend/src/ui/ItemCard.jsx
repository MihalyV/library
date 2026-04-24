import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState, useEffect } from "react";

function ItemCard({ item, onOpenDetails, onBorrow, userLoans = [] }) {
  const typeId = item.itemType?.typeId;
  const typeLabel = typeId === 1 ? "Könyv" : typeId === 2 ? "CD" : "Egyéb";
  const typeIcon = typeId === 1 ? <MenuBookIcon /> : <MusicNoteIcon />;

  const isBorrowedByUser = userLoans.some(loan => loan.itemCopy?.item?.itemId === item.itemId);

  const isAvailable = item.status === "Elérhető" ||
    (item.itemCopies && item.itemCopies.some(copy => copy.status === "Elérhető"));

  let statusLabel = "Nincs készleten";
  let statusColor = "#ef4444";
  let StatusIcon = <ErrorIcon />;

  if (isBorrowedByUser) {
    statusLabel = "Nálad van";
    statusColor = "#3b82f6";
    StatusIcon = <PersonIcon />;
  } else if (isAvailable) {
    statusLabel = "Elérhető";
    statusColor = "#4ca38d";
    StatusIcon = <CheckCircleIcon />;
  }

  const authors = item.author?.length
    ? item.author.map((a) => a.authorName).join(", ")
    : "Ismeretlen szerző";

  const getSaved = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("library_wishlist") || "[]");
      return saved.some(s => s.itemId === item.itemId);
    } catch {
      return false;
    }
  };

  const [isSaved, setIsSaved] = useState(getSaved);

  useEffect(() => {
    setIsSaved(getSaved());
  }, [item.itemId]);

  const toggleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("library_wishlist") || "[]");
      let updated;
      if (isSaved) {
        updated = saved.filter(s => s.itemId !== item.itemId);
      } else {
        updated = [...saved, {
          itemId: item.itemId,
          title: item.title,
          author: item.author,
          itemType: item.itemType,
          shortDescription: item.shortDescription
        }];
      }
      localStorage.setItem("library_wishlist", JSON.stringify(updated));
      setIsSaved(!isSaved);
    } catch {
      // silent
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderRadius: "1rem",
        boxShadow: "0 0.25rem 1.25rem rgba(0,0,0,0.4)",
        transition: "transform 0.3s ease",
        overflow: "hidden",
        backgroundColor: "#1A2723",
        "&:hover": { transform: "translateY(-0.3rem)" },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "6.25rem", sm: "9.375rem", md: "25%" },
          objectFit: "cover",
          padding: '1rem',
          borderRadius: '2rem'
        }}
        image={`https://picsum.photos/seed/${item.itemId}/400/600`}
        alt={item.title}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          textAlign: "left",
          color: "#F0EEEB"
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            alignItems: "center"
          }}
        >
          <Tooltip title={isSaved ? "Eltávolítás a kívánságlistáról" : "Mentés a kívánságlistára"}>
            <IconButton
              onClick={toggleSave}
              size="small"
              sx={{
                color: isSaved ? "#4ca38d" : "rgba(255,255,255,0.3)",
                backgroundColor: isSaved ? "rgba(76, 163, 141, 0.15)" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(76, 163, 141, 0.15)",
                  color: "#4ca38d"
                },
                transition: "all 0.2s ease"
              }}
            >
              {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>
          <Chip
            label={statusLabel}
            icon={StatusIcon}
            size="small"
            sx={{
              backgroundColor: statusColor,
              color: "#0a1410",
              fontWeight: 700,
              "& .MuiChip-icon": { color: "#0a1410" }
            }}
          />
          <Chip
            label={typeLabel}
            icon={typeIcon}
            size="small"
            sx={{
              backgroundColor: "#2A433C",
              fontWeight: 600,
              color: "#F0EEEB",
              "& .MuiChip-icon": { color: "#F0EEEB" }
            }}
          />
        </Stack>

        <Box sx={{ paddingRight: "4rem", mt: 1, marginTop:'1rem' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, marginBottom: "0.25rem", color: "#F0EEEB", width: '100%', marginTop: '0.5rem' }}
          >
            {item.title}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: "#F0EEEB", marginBottom: "1rem" }}>
            {authors}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#9ca3af",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {item.shortDescription}
        </Typography>

        <Box sx={{ marginTop: "auto", display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onOpenDetails(item)}
            sx={{
              borderRadius: "0.5rem",
              borderColor: "#4ca38d",
              color: "#F0EEEB",
              textTransform: "none",
              fontWeight: 600,
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              "&:hover": {
                backgroundColor: "rgba(76, 163, 141, 0.1)",
                borderColor: "#4ca38d",
              },
            }}
          >
            Részletek
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!isAvailable || isBorrowedByUser}
            onClick={() => onBorrow(item)}
            sx={{
              borderRadius: "0.5rem",
              backgroundColor: "#4ca38d",
              color: "#0a1410",
              textTransform: "none",
              fontWeight: 700,
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              "&:hover": { backgroundColor: "#3d8270" },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "rgba(255, 255, 255, 0.2)"
              }
            }}
          >
            {isBorrowedByUser ? "Nálad van" : "Kölcsönzés"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ItemCard;