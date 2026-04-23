import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

function ItemCard({ item, onOpenDetails }) {
  const typeId = item.itemType?.typeId;
  const typeLabel = typeId === 1 ? "Könyv" : typeId === 2 ? "CD" : "Egyéb";
  const typeIcon = typeId === 1 ? <MenuBookIcon /> : <MusicNoteIcon />;

  const authors = item.author?.length
    ? item.author.map((a) => a.authorName).join(", ")
    : "Ismeretlen szerző";

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row", 
        borderRadius: "1rem",
        boxShadow: "0 0.25rem 1.25rem rgba(0,0,0,0.08)",
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
        <Chip
          label={typeLabel}
          icon={typeIcon}
          size="small"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#2A433C",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            fontWeight: 600,
            color: "#F0EEEB" ,
          }}
        />

        <Box sx={{ paddingRight: "4rem" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, marginBottom: "0.25rem", color: "#F0EEEB" }}
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
                color: "#F0EEEB", 
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

        <Box sx={{ marginTop: "auto" }}>
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
                backgroundColor: "#4ca38d",
                color: "white",
                borderColor: "#4ca38d",
              },
            }}
          >
            Részletek
          </Button> 
        </Box>
      </CardContent>
    </Card>
  );
}

export default ItemCard;