import { 
  AppBar, Box, Toolbar, IconButton, Typography, 
  Container, Button, Stack 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useState } from 'react';

const pages = ['Főoldal', 'Katalógus', 'Keresés', 'Dashboard'];

function Navbar() {
  const [activePage, setActivePage] = useState('Főoldal');

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        top: 0,
        zIndex: 100,
        backgroundColor: '#0a1410', 
        boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.1)',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem', 
        opacity: 0.9
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: { xs: 0, md: '2rem' } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#4ca38d', 
              borderRadius: '0.75rem', 
              padding: '0.5rem', 
              marginRight: '1rem' 
            }}>
              <MenuBookIcon sx={{ color: '#0a1410', fontSize: '1.5rem' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', fontFamily: 'serif', fontSize: '1.25rem' }}>
              Könyvtár
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {pages.map((page) => {
              const isActive = activePage === page;
              
              return (
                <Button
                  key={page}
                  onClick={() => setActivePage(page)}
                  sx={{ 
                    marginTop: '1rem', 
                    marginBottom: '1rem',
                    color: isActive ? '#4ca38d' : '#9ca3af',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive ? 'rgba(76, 163, 141, 0.1)' : 'transparent',
                    borderRadius: '0.625rem',
                    paddingLeft: '1.25rem', 
                    paddingRight: '1.25rem',
                    '&:hover': { 
                      backgroundColor: isActive ? 'rgba(76, 163, 141, 0.2)' : 'rgba(255,255,255,0.05)',
                    }
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          <Stack direction="row" spacing={'0.5rem'} sx={{ marginRight: { xs: 0, md: '2rem' } }}>
            <IconButton sx={{ color: 'white', padding: '0.5rem' }}>
                <DarkModeIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton sx={{ color: 'white', padding: '0.5rem' }}>
                <SearchIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton sx={{ color: 'white', padding: '0.5rem' }}>
                <PersonOutlinedIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            
            <Button 
              variant="outlined" 
              sx={{ 
                color: 'white', 
                borderColor: '#333', 
                borderRadius: '0.625rem', 
                textTransform: 'none',
                fontSize: '0.9rem',
                paddingLeft: '1.5rem', 
                paddingRight: '1.5rem',
                marginLeft: '0.5rem',
                '&:hover': { borderColor: '#4ca38d', backgroundColor: 'rgba(76, 163, 141, 0.05)' }
              }}
            >
              Bejelentkezés
            </Button>
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;