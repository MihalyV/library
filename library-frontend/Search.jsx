import * as React from 'react';
import { 
  Box, Container, Typography, TextField, InputAdornment, 
  IconButton, Stack, Button 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Search() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <Box sx={{ 
      backgroundColor: '#0a1410', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      color: 'white',
      py: '4rem'
    }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: '3rem' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: '1rem', fontFamily: 'serif' }}>
            Keresés
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>
            Keressen könyveink, DVD-ink és egyéb tételeink között cím, szerző, ISBN vagy műfaj alapján
          </Typography>
        </Box>

        <Box sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.03)', 
          p: '1rem', 
          borderRadius: '1.25rem', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          mb: '5rem'
        }}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              placeholder="Cím, szerző vagy ISBN alapján keresés..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                backgroundColor: 'rgba(0,0,0,0.2)', 
                borderRadius: '0.75rem',
                '& .MuiOutlinedInput-root': {
                  height: '3.5rem',
                  '& fieldset': { border: 'none' },
                },
                input: { color: 'white' }
              }}
            />
            
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ 
                backgroundColor: '#4ca38d', 
                color: '#0a1410', 
                fontWeight: 'bold',
                px: '2rem',
                borderRadius: '0.75rem',
                textTransform: 'none',
                height: '3.5rem',
                '&:hover': { backgroundColor: '#3d8270' }
              }}
            >
              Keresés
            </Button>

            <IconButton 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                color: 'white',
                borderRadius: '0.75rem',
                width: '3.5rem',
                height: '3.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ textAlign: 'center', opacity: 0.4 }}>
          <Box sx={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255,255,255,0.03)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mx: 'auto',
            mb: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <SearchIcon sx={{ fontSize: '2.5rem', color: '#4ca38d' }} />
          </Box>
          <Typography variant="h6">
            Használja a fenti keresőt a tételek megtalálásához
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Search;