import React from 'react';
import { 
  Dialog, DialogContent, Box, Typography, 
  IconButton, Chip, Stack, Fade 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

function ItemDetails({ open, onClose, item }) {
  if (!item) return null;

  const authors = item.author?.map(a => a.authorName).join(", ") || "Ismeretlen szerző";
  const genres = item.genres?.map(g => g.genreType) || [];

  const InfoCard = ({ icon, label, value }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.8rem', 
      padding: '1rem', 
      backgroundColor: 'rgba(255,255,255,0.02)', 
      borderRadius: '0.8rem',
      border: '0.05rem solid rgba(255,255,255,0.05)',
      flex: '1 1 14rem'
    }}>
      {icon}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05rem' }}>
          {label}
        </Typography>
        <Typography sx={{ color: '#f1f5f9', fontSize: '0.95rem', fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 450 }}
      slotProps={{
        paper: {
          sx: { 
            backgroundColor: '#070f0c', 
            color: '#e2e8f0', 
            borderRadius: '1.5rem',
            backgroundImage: 'none',
            border: '0.05rem solid rgba(76,163,141,0.25)',
            boxShadow: '0 2.5rem 5rem rgba(0,0,0,0.7)'
          }
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ 
          position: 'absolute', 
          right: '1.5rem', 
          top: '1.5rem', 
          color: '#4ca38d', 
          backgroundColor: 'rgba(76,163,141,0.08)',
          '&:hover': { backgroundColor: 'rgba(76,163,141,0.15)', transform: 'rotate(90deg)' },
          transition: 'all 0.3s ease',
          zIndex: 10 
        }}
      >
        <CloseIcon sx={{ fontSize: '1.3rem' }} />
      </IconButton>

      <DialogContent sx={{ padding: { xs: '2rem', md: '3.5rem' }, overflowX: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '3rem', mb: '3rem' }}>
          
          <Box sx={{ position: 'relative', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            <Box 
              component="img"
              src={`https://picsum.photos/seed/${item.itemId}/400/600`}
              alt={item.title}
              sx={{ 
                width: '16rem', 
                height: '22rem', 
                borderRadius: '1.2rem',
                objectFit: 'cover',
                border: '0.05rem solid rgba(76,163,141,0.3)',
                boxShadow: '0 1.5rem 3.5rem rgba(0,0,0,0.5)'
              }}
            />
            {item.featured && (
              <Box sx={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: '#fbc02d',
                color: '#070f0c',
                padding: '0.3rem 0.8rem',
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 800,
                fontSize: '0.75rem',
                boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.3)'
              }}>
                <AutoAwesomeIcon sx={{ fontSize: '0.9rem' }} /> KIEMELT
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: 'serif', mb: '0.75rem', color: '#ffffff', lineHeight: 1.1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              {item.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.6rem', mb: '1.5rem' }}>
              <PersonOutlineOutlinedIcon sx={{ color: '#4ca38d', fontSize: '1.4rem' }} />
              <Typography sx={{ color: '#7eddc8', fontSize: '1.15rem', fontWeight: 500 }}>
                {authors}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', mb: '2rem' }}>
              <Chip 
                label={item.status || "Elérhető"} 
                sx={{ 
                  backgroundColor: item.status === "Kikölcsönözve" ? 'rgba(239, 68, 68, 0.12)' : 'rgba(76, 163, 141, 0.12)', 
                  color: item.status === "Kikölcsönözve" ? '#f87171' : '#4ca38d', 
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  border: `0.05rem solid ${item.status === "Kikölcsönözve" ? 'rgba(239, 68, 68, 0.3)' : 'rgba(76, 163, 141, 0.3)'}`
                }} 
              />
              {genres.map((g, i) => (
                <Chip key={i} label={g} variant="outlined" sx={{ color: '#94a3b8', borderColor: 'rgba(148,163,184,0.3)', fontSize: '0.8rem' }} />
              ))}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              <InfoCard 
                icon={<InfoOutlinedIcon sx={{ color: '#4ca38d' }} />} 
                label="Típus" 
                value={item.itemType?.itemType || 'Ismeretlen'} 
              />
              <InfoCard 
                icon={<MenuBookIcon sx={{ color: '#4ca38d' }} />} 
                label="ISBN" 
                value={item.isbn || '---'} 
              />
              <InfoCard 
                icon={<ChildCareIcon sx={{ color: '#4ca38d' }} />} 
                label="Korhatár" 
                value={`${item.minAge || 0}+ év`} 
              />
              <InfoCard 
                icon={<FingerprintIcon sx={{ color: '#4ca38d' }} />} 
                label="Azonosító" 
                value={`#${item.itemId}`} 
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ borderTop: '0.05rem solid rgba(255,255,255,0.05)', pt: '2rem' }}>
          <Typography sx={{ 
            color: '#7eddc8', 
            fontSize: '0.8rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1rem',
            mb: '1.5rem'
          }}>
            Leírás és részletek
          </Typography>
          
          <Stack spacing={2.5}>
            <Typography sx={{ color: '#ffffff', fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic', borderLeft: '0.2rem solid #4ca38d', pl: '1.5rem' }}>
              {item.shortDescription || "Nincs rövid összefoglaló."}
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify' }}>
              {item.longDescription || "Ehhez a tételhez nem tartozik részletes leírás."}
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetails;