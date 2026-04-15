import * as React from 'react';
import { 
  AppBar, Box, Toolbar, IconButton, Typography, 
  Container, Button, Stack 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const pages = ['Főoldal', 'Katalógus', 'Keresés', 'Dashboard'];

function Navbar() {
  const [activePage, setActivePage] = React.useState('Főoldal');

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#0a1410', 
        boxShadow: 'none',
        paddingY: 0.5 
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, md: '2rem' } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#4ca38d', 
              borderRadius: '12px', 
              p: 1, 
              mr: 1.5 
            }}>
              <MenuBookIcon sx={{ color: '#0a1410' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', fontFamily: 'serif' }}>
              Könyvtár
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
            {pages.map((page) => {
              const isActive = activePage === page;
              
              return (
                <Button
                  key={page}
                  onClick={() => setActivePage(page)}
                  sx={{ 
                    my: 2, 
                    color: isActive ? '#4ca38d' : '#9ca3af',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 400,
                    backgroundColor: isActive ? 'rgba(76, 163, 141, 0.1)' : 'transparent',
                    borderRadius: '10px',
                    px: 2,
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

          <Stack direction="row" spacing={1} sx={{ mr: { xs: 0, md: '2rem' } }}>
            <IconButton sx={{ color: 'white' }}><DarkModeIcon /></IconButton>
            <IconButton sx={{ color: 'white' }}><SearchIcon /></IconButton>
            <IconButton sx={{ color: 'white' }}><PersonOutlinedIcon /></IconButton>
            
            <Button 
              variant="outlined" 
              sx={{ 
                color: 'white', 
                borderColor: '#333', 
                borderRadius: '10px',
                textTransform: 'none',
                px: 3,
                ml: 1,
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