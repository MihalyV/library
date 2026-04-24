import { 
  AppBar, Box, Toolbar, IconButton, Typography, 
  Container, Button, Stack 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('library_token');
    const firstName = localStorage.getItem('user_first_name');
    const role = localStorage.getItem('user_role') || 'user';
    if (token && firstName) {
      setIsLoggedIn(true);
      setUserFirstName(firstName);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserFirstName('');
      setUserRole('user');
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPages = () => {
    const basePages = ['Főoldal', 'Katalógus', 'Keresés'];
    if (userRole === 'admin' || userRole === 'librarian') {
      basePages.push('Dashboard');
    } else if (isLoggedIn) {
      basePages.push('Könyvespolc');
    }
    return basePages;
  };

  const getPath = (page) => {
    if (page === 'Főoldal') return '/';
    if (page === 'Katalógus') return '/katalogus';
    if (page === 'Keresés') return '/kereses';
    if (page === 'Dashboard') return '/dashboard';
    if (page === 'Könyvespolc') return '/konyvespolc';
    return '/';
  };

  const isActive = (page) => {
    const path = getPath(page);
    return location.pathname === path;
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setUserFirstName('');
    setUserRole('user');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/profil' : '/bejelentkezes');
  };

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-0.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .nav-logo-text {
          background: linear-gradient(90deg, #ffffff 0%, #4ca38d 40%, #7eddc8 60%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .nav-page-btn {
          position: relative;
          transition: color 0.25s ease, background-color 0.25s ease !important;
        }
        .nav-page-btn::after {
          content: '';
          position: absolute;
          bottom: 0.3rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0.15rem;
          background: linear-gradient(90deg, #4ca38d, #7eddc8);
          border-radius: 1rem;
          transition: width 0.3s ease;
        }
        .nav-page-btn:hover::after,
        .nav-page-btn.active::after {
          width: 60%;
        }
        .nav-icon-btn {
          transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease !important;
        }
        .nav-icon-btn:hover {
          transform: scale(1.1);
        }
        .nav-logout-btn {
          transition: all 0.25s ease !important;
        }
        .nav-login-btn {
          transition: all 0.25s ease, box-shadow 0.25s ease !important;
        }
        .nav-login-btn:hover {
          box-shadow: 0 0 1rem rgba(76, 163, 141, 0.5) !important;
        }
      `}</style>

      <AppBar
        position="sticky"
        sx={{
          top: 0,
          zIndex: 100,
          backgroundColor: scrolled ? 'rgba(10, 20, 16, 0.97)' : 'rgba(10, 20, 16, 0.85)',
          backdropFilter: 'blur(0.75rem)',
          boxShadow: scrolled ? '0 0.25rem 2rem rgba(0,0,0,0.4)' : '0 0.1rem 0 rgba(76,163,141,0.15)',
          borderBottom: '0.05rem solid rgba(76, 163, 141, 0.12)',
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
          animation: 'fadeInDown 0.5s ease',
          py: '0.4rem',
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>

            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                ml: { xs: 0, md: '2rem' },
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <Box
                component="img"
                src="/src/assets/logo.png"
                alt="KönyvPont logó"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                sx={{
                  height: '2.5rem',
                  width: '2.5rem',
                  objectFit: 'cover',
                  clipPath: 'circle(50% at 50% 50%)',
                  filter: 'drop-shadow(0 0 0.5rem rgba(76,163,141,0.6))',
                  transition: 'filter 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    filter: 'drop-shadow(0 0 1rem rgba(76,163,141,0.9))',
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <Box
                sx={{
                  display: 'none',
                  alignItems: 'center',
                  backgroundColor: 'rgba(76,163,141,0.15)',
                  border: '0.05rem solid rgba(76,163,141,0.4)',
                  borderRadius: '0.75rem',
                  padding: '0.5rem',
                }}
              >
                <Typography sx={{ color: '#4ca38d', fontSize: '1.4rem', lineHeight: 1 }}>📚</Typography>
              </Box>
              <Typography
                variant="h6"
                className="nav-logo-text"
                sx={{
                  fontWeight: 800,
                  fontFamily: 'serif',
                  fontSize: '1.3rem',
                  letterSpacing: '0.02rem',
                }}
              >
                KönyvPont
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
              {getPages().map((page) => (
                <Button
                  key={page}
                  className={`nav-page-btn${isActive(page) ? ' active' : ''}`}
                  onClick={() => navigate(getPath(page))}
                  sx={{
                    color: isActive(page) ? '#7eddc8' : '#9ca3af',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive(page) ? 600 : 400,
                    borderRadius: '0.625rem',
                    px: '1.25rem',
                    py: '0.6rem',
                    '&:hover': {
                      color: '#e2e8f0',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Stack
              direction="row"
              spacing="0.5rem"
              sx={{
                mr: { xs: 0, md: '2rem' },
                alignItems: 'center',
              }}
            >
              <IconButton
                className="nav-icon-btn"
                sx={{
                  color: '#9ca3af',
                  padding: '0.5rem',
                  borderRadius: '0.6rem',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                <SearchIcon sx={{ fontSize: '1.25rem' }} />
              </IconButton>

              <IconButton
                className="nav-icon-btn"
                onClick={handleProfileClick}
                sx={{
                  color: '#9ca3af',
                  padding: '0.5rem',
                  borderRadius: '0.6rem',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                <PersonOutlinedIcon sx={{ fontSize: '1.25rem' }} />
              </IconButton>

              {isLoggedIn ? (
                <Stack direction="row" spacing="0.75rem" alignItems="center" sx={{ ml: '0.5rem' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      px: '0.875rem',
                      py: '0.4rem',
                      borderRadius: '2rem',
                      backgroundColor: 'rgba(76, 163, 141, 0.08)',
                      border: '0.05rem solid rgba(76, 163, 141, 0.2)',
                    }}
                  >
                    <Box
                      sx={{
                        width: '0.5rem',
                        height: '0.5rem',
                        borderRadius: '50%',
                        backgroundColor: '#4ca38d',
                        boxShadow: '0 0 0.4rem #4ca38d',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#cbd5e1',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        lineHeight: 1,
                      }}
                    >
                      Szia, <span style={{ color: '#7eddc8', fontWeight: 700 }}>{userFirstName}</span>!
                    </Typography>
                  </Box>
                  <Button
                    className="nav-logout-btn"
                    onClick={handleLogout}
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(76, 163, 141, 0.4)',
                      color: '#9ca3af',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: '0.6rem',
                      fontSize: '0.875rem',
                      px: '1rem',
                      py: '0.4rem',
                      '&:hover': {
                        borderColor: '#ef4444',
                        color: '#ef4444',
                        backgroundColor: 'rgba(239,68,68,0.06)',
                      },
                    }}
                  >
                    Kijelentkezés
                  </Button>
                </Stack>
              ) : (
                <Button
                  className="nav-login-btn"
                  component={Link}
                  to="/bejelentkezes"
                  variant="contained"
                  sx={{
                    ml: '0.5rem',
                    background: 'linear-gradient(135deg, #4ca38d 0%, #3d8270 100%)',
                    color: '#0a1410',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '0.6rem',
                    fontSize: '0.9rem',
                    px: '1.25rem',
                    py: '0.5rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5ab89f 0%, #4a9a85 100%)',
                    },
                  }}
                >
                  Bejelentkezés
                </Button>
              )}
            </Stack>

          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;