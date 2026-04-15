import { 
  Box, Card, CardContent, CardMedia, Typography, 
  Button, Chip 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function ItemCard({ item }) {
  const typeName = item.itemType?.typeName || 'Tétel';

  const authors = item.author?.length
    ? item.author.map(a => a.authorName).join(', ')
    : 'Ismeretlen szerző';

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '1rem',
        boxShadow: '0 0.25rem 1.25rem rgba(0,0,0,0.08)',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'translateY(-0.5rem)' }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://picsum.photos/seed/${item.itemId}/400/600`}
          alt={item.title}
          sx={{ objectFit: 'cover' }}
        />

        <Chip 
          label={typeName}
          icon={typeName === 'Könyv' ? <MenuBookIcon /> : <MusicNoteIcon />}
          sx={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(0.25rem)',
            fontWeight: 600
          }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: '1.5rem' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: '0.25rem', color: '#1e293b' }}>
          {item.title}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: '#64748b', mb: '1rem' }}>
          {authors}
        </Typography>

        <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
          {item.shortDescription}
        </Typography>
      </CardContent>

      <Box sx={{ p: '1.5rem', pt: 0 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          sx={{ 
            borderRadius: '0.5rem', 
            borderColor: '#4ca38d', 
            color: '#4ca38d',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { backgroundColor: '#4ca38d', color: 'white', borderColor: '#4ca38d' }
          }}
        >
          Részletek
        </Button>
      </Box>
    </Card>
  );
}

export default ItemCard;