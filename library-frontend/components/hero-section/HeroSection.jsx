import * as React from 'react';
import { 
  Box, Typography, Button, Container, TextField, 
  Stack, Chip 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        backgroundImage: 'url("https://images.unsplash.com/photo-1481627526605-594d3f93ad5b?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(76, 163, 141, 0.85)',
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: { md: '4rem' }, 
          paddingRight: { md: '4rem' } 
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start',
          textAlign: 'left'
        }}>
          
          <Chip 
            icon={<MenuBookIcon style={{ color: '#eab308', fontSize: '1rem' }} />} 
            label="Digitális Könyvtár" 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              color: '#eab308', 
              marginBottom: '2rem', 
              borderRadius: '0.5rem',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              fontSize: '0.875rem'
            }} 
          />

          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '2.5rem', md: '4rem' },
              maxWidth: '45rem',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              color: '#0a1410',
              fontFamily: 'serif'
            }}
          >
            Fedezze fel a <span style={{ color: '#eab308' }}>tudás végtelen</span> világát
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.125rem', 
              maxWidth: '37.5rem', 
              marginBottom: '3rem', 
              color: '#1a2e26',
              lineHeight: 1.6
            }}
          >
            Böngésszen könyvtárunk gazdag gyűjteményében, keressen rá kedvenc szerzőire, 
            és kölcsönözzön egyszerűen online.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={'1rem'} 
            sx={{ marginBottom: '4rem', width: '100%', justifyContent: 'flex-start' }}
          >
            <TextField
              placeholder="Keresés cím, szerző vagy ISBN alapján..."
              variant="outlined"
              sx={{
                width: { xs: '100%', sm: '30rem' },
                backgroundColor: '#1a2e26',
                borderRadius: '0.75rem',
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  borderRadius: '0.75rem',
                  height: '3.5rem',
                  '& fieldset': { border: 'none' },
                }
              }}
            />
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#eab308',
                color: '#0a1410',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                height: '3.5rem',
                borderRadius: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#ca8a04' }
              }}
            >
              Keresés
            </Button>
          </Stack>

          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={'3rem'}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MenuBookIcon sx={{ color: '#eab308', fontSize: '1.5rem' }} />
              <Typography sx={{ fontWeight: 500, color: '#0a1410', fontSize: '1rem' }}>10,000+ könyv</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PeopleIcon sx={{ color: '#eab308', fontSize: '1.5rem' }} />
              <Typography sx={{ fontWeight: 500, color: '#0a1410', fontSize: '1rem' }}>5,000+ olvasó</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SecurityIcon sx={{ color: '#eab308', fontSize: '1.5rem' }} />
              <Typography sx={{ fontWeight: 500, color: '#0a1410', fontSize: '1rem' }}>Biztonságos rendszer</Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;