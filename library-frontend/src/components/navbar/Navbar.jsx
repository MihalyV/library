import { 
  AppBar, Box, Toolbar, IconButton, Typography, 
  Container, Button, Stack 
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api';

const pages = ['Főoldal', 'Katalógus', 'Keresés', 'Dashboard'];

function Navbar() {
  const [activePage, setActivePage] = useState('Főoldal');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('library_token');
    const firstName = localStorage.getItem('user_first_name');
    if (token && firstName) {
      setIsLoggedIn(true);
      setUserFirstName(firstName);
    } else {
      setIsLoggedIn(false);
      setUserFirstName('');
    }
  }, [location]);

  const handlePageClick = (page) => {
    setActivePage(page);
    if (page === 'Főoldal') navigate('/');
    else if (page === 'Katalógus') navigate('/katalogus');
    else if (page === 'Keresés') navigate('/kereses');
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setUserFirstName('');
  };

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
                  onClick={() => handlePageClick(page)}
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

          <Stack direction="row" spacing={'0.5rem'} sx={{ marginRight: { xs: 0, md: '2rem' }, alignItems: 'center' }}>
            <IconButton sx={{ color: 'white', padding: '0.5rem' }}>
                <DarkModeIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton sx={{ color: 'white', padding: '0.5rem' }}>
                <SearchIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <IconButton sx={{ color: 'white', padding: '0.5rem' }}>
                <PersonOutlinedIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            
            {isLoggedIn ? (
              <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 2 }}>
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  Szia, {userFirstName}!
                </Typography>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{
                    borderColor: '#4ca38d',
                    color: '#4ca38d',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '0.6rem',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(76, 163, 141, 0.1)',
                      borderColor: '#3d8270'
                    }
                  }}
                >
                  Kijelentkezés
                </Button>
              </Stack>
            ) : (
              <Button
                component={Link}
                to="/bejelentkezes"
                variant="contained"
                sx={{
                  backgroundColor: '#4ca38d',
                  color: '#0a1410',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '0.6rem',
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#3d8270',
                  }
                }}
              >
                Bejelentkezés
              </Button>
            )}
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
