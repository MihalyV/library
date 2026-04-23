import * as React from 'react';
import { 
  Dialog, DialogContent, Box, Typography, 
  IconButton, Chip, Stack, Button 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HistoryIcon from '@mui/icons-material/History';

function ItemDetails({ open, onClose, item }) {
  const [tab, setTab] = React.useState('description');

  if (!item) return null;

  const authors = item.author?.map(a => a.authorName).join(", ") || "Mihail Bulgakov";
  const genres = item.genre?.map(g => g.genreName) || ["Regény"];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { 
            backgroundColor: '#0a1410', // Mélyebb fekete-zöld háttér
            color: 'white', 
            borderRadius: '1.2rem',
            backgroundImage: 'none',
            border: '1px solid rgba(255,255,255,0.08)'
          }
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#ffffff', opacity: 0.8, zIndex: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ padding: { xs: '2rem', md: '4rem' } }}>
        {/* Felső rész: Kép és Alapadatok */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '3rem', marginBottom: '2.5rem' }}>
          
          <Box sx={{ 
            width: '180px', 
            height: '240px', 
            backgroundColor: 'rgba(255,255,255,0.03)', 
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.05)',
            flexShrink: 0
          }}>
            <MenuBookIcon sx={{ fontSize: '4rem', color: '#4ca38d', opacity: 0.3 }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, pt: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'serif', marginBottom: '1.5rem', fontSize: '2.2rem' }}>
              {item.title || "A Mester és Margarita"}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ marginBottom: '2rem' }}>
              <Chip 
                label={item.status || "Elérhető"} 
                sx={{ backgroundColor: 'rgba(76, 163, 141, 0.15)', color: '#4ca38d', fontWeight: 600, borderRadius: '8px' }} 
              />
              <Chip 
                label={item.itemType?.typeName || 'Könyv'} 
                sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#9ca3af', borderRadius: '8px' }} 
              />
              {genres.map((g, index) => (
                <Chip key={`${g}-${index}`} label={g} sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#9ca3af', borderRadius: '8px' }} />
              ))}
            </Stack>

            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <PersonOutlineOutlinedIcon sx={{ color: '#9ca3af', fontSize: '1.4rem' }} />
                <Typography sx={{ color: '#9ca3af', fontSize: '1.05rem' }}>
                  <span style={{ color: 'white', fontWeight: 500 }}>Szerző:</span> {authors}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MenuBookIcon sx={{ color: '#9ca3af', fontSize: '1.2rem' }} />
                <Typography sx={{ color: '#9ca3af', fontSize: '1.05rem' }}>
                  <span style={{ color: 'white', fontWeight: 500 }}>ISBN:</span> {item.isbn || '978-963-14-2847-5'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '2.5rem' }} />

        {/* Tab gombok */}
        <Box sx={{ 
          display: 'flex', 
          backgroundColor: 'rgba(0,0,0,0.2)', 
          borderRadius: '12px', 
          padding: '5px', 
          marginBottom: '2.5rem',
          border: '1px solid rgba(255,255,255,0.03)'
        }}>
          <Button 
            fullWidth
            onClick={() => setTab('description')}
            sx={{ 
              borderRadius: '10px', textTransform: 'none', fontWeight: 600, py: 1.2,
              backgroundColor: tab === 'description' ? '#16211e' : 'transparent',
              color: tab === 'description' ? 'white' : '#6b7280',
              '&:hover': { backgroundColor: tab === 'description' ? '#1c2925' : 'rgba(255,255,255,0.02)' }
            }}
          >
            Leírás
          </Button>
          <Button 
            fullWidth
            onClick={() => setTab('history')}
            startIcon={<HistoryIcon />}
            sx={{ 
              borderRadius: '10px', textTransform: 'none', fontWeight: 600, py: 1.2,
              backgroundColor: tab === 'history' ? '#16211e' : 'transparent',
              color: tab === 'history' ? 'white' : '#6b7280',
              '&:hover': { backgroundColor: tab === 'history' ? '#1c2925' : 'rgba(255,255,255,0.02)' }
            }}
          >
            Előzmények
          </Button>
        </Box>

        {/* Tartalom */}
        <Box sx={{ minHeight: '12rem' }}>
          {tab === 'description' ? (
            <Stack spacing={3}>
              <Typography sx={{ color: '#d1d5db', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {item.shortDescription || "Bulgakov leghíresebb regénye, amely a szovjet Moszkva és a bibliai Jeruzsálem párhuzamos történetét meséli el."}
              </Typography>
              <Typography sx={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>
                {item.longDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </Typography>
            </Stack>
          ) : (
            <Typography sx={{ color: '#6b7280', textAlign: 'center', marginTop: '3rem' }}>
              Még nincsenek korábbi kölcsönzési adatok.
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetails;