import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Box, Container, Typography, TextField, InputAdornment, 
  IconButton, Stack, Button, MenuItem, Select
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  
  const [searchTerm, setSearchTerm] = React.useState(queryParam);
  const [showFilters, setShowFilters] = React.useState(false);
  const [type, setType] = React.useState('Összes típus');
  const [status, setStatus] = React.useState('Minden státusz');
  const [genre, setGenre] = React.useState('Összes');

  React.useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchTrigger = () => {
    setSearchParams(searchTerm ? { query: searchTerm } : {});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchTrigger();
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#0a1410', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      color: 'white',
      py: '4rem'
    }}>
      <Container maxWidth="lg">
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
          p: '1.5rem', 
          borderRadius: '1.25rem', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          mb: '5rem'
        }}>
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              mb: showFilters ? '2rem' : 0,
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              placeholder="Cím, szerző vagy ISBN alapján keresés..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
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
                '& input': { color: 'white' }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleSearchTrigger}
              startIcon={<SearchIcon />}
              sx={{ 
                backgroundColor: '#4ca38d', 
                color: '#0a1410', 
                fontWeight: 'bold',
                px: '2rem',
                borderRadius: '0.75rem',
                textTransform: 'none',
                height: '3.5rem',
                whiteSpace: 'nowrap',
                '&:hover': { backgroundColor: '#3d8270' }
              }}
            >
              Keresés
            </Button>

            <IconButton 
              onClick={() => setShowFilters(!showFilters)}
              sx={{ 
                backgroundColor: showFilters ? 'rgba(76, 163, 141, 0.2)' : 'rgba(255,255,255,0.05)', 
                color: showFilters ? '#4ca38d' : 'white',
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

          {showFilters && (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: '1.5rem',
                pt: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: '0.5rem', fontSize: '0.875rem' }}>
                  Típus
                </Typography>
                <Select
                  fullWidth
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    color: 'white', 
                    borderRadius: '0.75rem',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                  <MenuItem value="Összes típus">Összes típus</MenuItem>
                  <MenuItem value="Könyv">Könyv</MenuItem>
                  <MenuItem value="DVD">DVD</MenuItem>
                  <MenuItem value="Folyóirat">Folyóirat</MenuItem>
                </Select>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: '0.5rem', fontSize: '0.875rem' }}>
                  Státusz
                </Typography>
                <Select
                  fullWidth
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    color: 'white', 
                    borderRadius: '0.75rem',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                  <MenuItem value="Minden státusz">Minden státusz</MenuItem>
                  <MenuItem value="Elérhető">Elérhető</MenuItem>
                  <MenuItem value="Kikölcsönözve">Kikölcsönözve</MenuItem>
                </Select>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: '0.5rem', fontSize: '0.875rem' }}>
                  Műfaj
                </Typography>
                <Select
                  fullWidth
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    color: 'white', 
                    borderRadius: '0.75rem',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    '& .MuiSvgIcon-root': { color: 'white' }
                  }}
                >
                  <MenuItem value="Összes">Összes</MenuItem>
                  <MenuItem value="Regény">Regény</MenuItem>
                  <MenuItem value="Sci-fi">Sci-fi</MenuItem>
                  <MenuItem value="Ismeretterjesztő">Ismeretterjesztő</MenuItem>
                </Select>
              </Box>
            </Box>
          )}
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
            {searchTerm ? `Eredmények keresése: "${searchTerm}"` : 'Használja a fenti keresőt a tételek megtalálásához'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Search;