import * as React from 'react';
import { 
  Box, Typography, Button, Container, TextField, 
  Stack, Chip 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/kereses?query=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/kereses');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const mockBooks = [
    { id: 1, title: '1984', author: 'George Orwell', color: '#1e3a2f', accent: '#4ca38d' },
    { id: 2, title: 'A gyűrűk ura', author: 'J.R.R. Tolkien', color: '#1a2e3b', accent: '#3b82f6' },
    { id: 3, title: 'Dűne', author: 'Frank Herbert', color: '#2e2a1a', accent: '#eab308' },
    { id: 4, title: 'Száz év magány', author: 'Gabriel García Márquez', color: '#2e1a2a', accent: '#a855f7' },
  ];

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(2rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroBadgePop {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-1.5rem) scale(1.04); }
        }
        @keyframes floatPanel {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%       { transform: translateY(-1rem) rotate(-2deg); }
        }
        @keyframes floatCard1 {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50%       { transform: translateY(-0.8rem) rotate(3deg); }
        }
        @keyframes floatCard2 {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%       { transform: translateY(-1.2rem) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-badge { animation: heroBadgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
        .hero-title { animation: heroFadeUp 0.7s ease 0.15s both; }
        .hero-subtitle { animation: heroFadeUp 0.7s ease 0.3s both; }
        .hero-search { animation: heroFadeUp 0.7s ease 0.45s both; }
        .hero-stats { animation: heroFadeUp 0.7s ease 0.6s both; }
        .hero-visual { animation: heroFadeUp 0.8s ease 0.2s both; }
        .hero-orb-1 { animation: floatOrb 7s ease-in-out infinite; }
        .hero-orb-2 { animation: floatOrb 9s ease-in-out 1.5s infinite; }
        .hero-panel-main { animation: floatPanel 6s ease-in-out infinite; }
        .hero-card-1 { animation: floatCard1 5s ease-in-out 0.5s infinite; }
        .hero-card-2 { animation: floatCard2 7s ease-in-out 1s infinite; }
        .hero-search-field input::placeholder { color: rgba(255,255,255,0.35); }
        .hero-search-btn {
          transition: background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease !important;
        }
        .hero-search-btn:hover {
          box-shadow: 0 0 1.5rem rgba(76,163,141,0.55) !important;
          transform: translateY(-0.1rem);
        }
        .hero-stat-item { transition: transform 0.2s ease, background-color 0.2s ease; }
        .hero-stat-item:hover {
          transform: translateY(-0.2rem);
          background-color: rgba(76,163,141,0.12) !important;
        }
        .hero-book-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: default; }
        .hero-book-card:hover { transform: scale(1.03) !important; box-shadow: 0 1rem 2rem rgba(0,0,0,0.5) !important; }
      `}</style>

      <Box sx={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#0a1410',
        overflow: 'hidden',
      }}>

        <Box sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1481627526605-594d3f93ad5b?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
        }} />

        <Box className="hero-orb-1" sx={{
          position: 'absolute', top: '-8rem', left: '-8rem',
          width: '32rem', height: '32rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,163,141,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <Box className="hero-orb-2" sx={{
          position: 'absolute', bottom: '-10rem', right: '5rem',
          width: '40rem', height: '40rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,163,141,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(76,163,141,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,163,141,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem',
          pointerEvents: 'none',
        }} />

        <Container maxWidth={false} sx={{
          position: 'relative', zIndex: 2,
          py: '5rem', px: { xs: '1.5rem', md: '5rem' },
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            gap: { xs: '4rem', lg: '6rem' },
          }}>

            <Box sx={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', flex: '1 1 0',
              minWidth: 0,
            }}>
              <Chip
                className="hero-badge"
                icon={<AutoStoriesIcon style={{ color: '#4ca38d', fontSize: '1rem' }} />}
                label="Digitális Könyvtár"
                sx={{
                  mb: '2rem',
                  backgroundColor: 'rgba(76,163,141,0.1)',
                  color: '#7eddc8',
                  borderRadius: '2rem',
                  border: '0.05rem solid rgba(76,163,141,0.35)',
                  fontSize: '0.85rem', fontWeight: 600,
                  letterSpacing: '0.03rem', px: '0.25rem',
                  '& .MuiChip-icon': { color: '#4ca38d' },
                }}
              />

              <Typography className="hero-title" variant="h1" sx={{
                fontWeight: 800,
                fontSize: { xs: '2.4rem', md: '3.6rem' },
                lineHeight: 1.15, mb: '1.5rem',
                fontFamily: 'serif', letterSpacing: '-0.02rem',
              }}>
                Fedezze fel a{' '}
                <Box component="span" sx={{
                  background: 'linear-gradient(135deg, #4ca38d 0%, #7eddc8 50%, #4ca38d 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  tudás végtelen
                </Box>{' '}
                világát
              </Typography>

              <Typography className="hero-subtitle" variant="body1" sx={{
                fontSize: '1.1rem', maxWidth: '35rem',
                mb: '3rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
              }}>
                Böngésszen könyvtárunk gazdag gyűjteményében, keressen rá kedvenc szerzőire,
                és kölcsönözzön egyszerűen online.
              </Typography>

              <Stack className="hero-search" direction={{ xs: 'column', sm: 'row' }}
                spacing="0.75rem" sx={{ mb: '3.5rem', width: '100%' }}>
                <Box className="hero-search-field" sx={{
                  flex: 1, maxWidth: { sm: '30rem' },
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.875rem',
                  border: '0.05rem solid rgba(76,163,141,0.2)',
                  transition: 'border-color 0.25s ease, background-color 0.25s ease',
                  '&:focus-within': {
                    borderColor: 'rgba(76,163,141,0.6)',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                  },
                }}>
                  <TextField fullWidth
                    placeholder="Keresés cím, szerző vagy ISBN alapján..."
                    variant="outlined" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white', borderRadius: '0.875rem',
                        height: '3.5rem', fontSize: '0.95rem',
                        '& fieldset': { border: 'none' },
                      },
                    }}
                  />
                </Box>
                <Button className="hero-search-btn" variant="contained"
                  onClick={handleSearch} endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #4ca38d 0%, #3d8270 100%)',
                    color: '#0a1410', px: '2rem', height: '3.5rem',
                    borderRadius: '0.875rem', fontWeight: 700,
                    textTransform: 'none', fontSize: '0.95rem',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    '&:hover': { background: 'linear-gradient(135deg, #5ab89f 0%, #4a9a85 100%)' },
                  }}>
                  Keresés
                </Button>
              </Stack>

              <Box className="hero-stats" sx={{
                display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '0.75rem',
              }}>
                {[
                  { icon: <MenuBookIcon sx={{ fontSize: '1.3rem', color: '#4ca38d' }} />, label: '10 000+ könyv' },
                  { icon: <PeopleIcon sx={{ fontSize: '1.3rem', color: '#4ca38d' }} />, label: '5 000+ olvasó' },
                  { icon: <SecurityIcon sx={{ fontSize: '1.3rem', color: '#4ca38d' }} />, label: 'Biztonságos rendszer' },
                ].map(({ icon, label }) => (
                  <Box key={label} className="hero-stat-item" sx={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    px: '1rem', py: '0.6rem', borderRadius: '0.75rem',
                    backgroundColor: 'rgba(76,163,141,0.07)',
                    border: '0.05rem solid rgba(76,163,141,0.15)',
                  }}>
                    {icon}
                    <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', fontWeight: 500 }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box className="hero-visual" sx={{
              flex: '0 0 auto',
              width: { lg: '26rem', xl: '30rem' },
              display: { xs: 'none', lg: 'flex' },
              position: 'relative',
              height: '32rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <Box className="hero-panel-main" sx={{
                position: 'absolute',
                width: '18rem',
                backgroundColor: 'rgba(15,30,24,0.95)',
                borderRadius: '1.25rem',
                border: '0.05rem solid rgba(76,163,141,0.25)',
                boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.6)',
                p: '1.5rem',
                top: '50%', left: '50%',
                transform: 'translate(-55%, -50%) rotate(-2deg)',
                zIndex: 3,
              }}>
                <Typography sx={{
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1rem',
                  textTransform: 'uppercase', color: '#4ca38d', mb: '1rem',
                }}>
                  Népszerű most
                </Typography>
                {mockBooks.map((book, i) => (
                  <Box key={book.id} className="hero-book-card" sx={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    p: '0.75rem', borderRadius: '0.75rem', mb: '0.5rem',
                    backgroundColor: i === 0 ? 'rgba(76,163,141,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `0.05rem solid ${i === 0 ? 'rgba(76,163,141,0.3)' : 'rgba(255,255,255,0.05)'}`,
                  }}>
                    <Box sx={{
                      width: '2.5rem', height: '3.5rem', borderRadius: '0.4rem',
                      backgroundColor: book.color,
                      border: `0.15rem solid ${book.accent}33`,
                      flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <AutoStoriesIcon sx={{ fontSize: '1rem', color: book.accent }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{
                        color: 'white', fontSize: '0.8rem', fontWeight: 600,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {book.title}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                        {book.author}
                      </Typography>
                    </Box>
                    {i === 0 && (
                      <Box sx={{ ml: 'auto', flexShrink: 0 }}>
                        <StarIcon sx={{ fontSize: '0.9rem', color: '#eab308' }} />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>

              <Box className="hero-card-1" sx={{
                position: 'absolute',
                bottom: '2rem', right: '0.5rem',
                width: '11rem',
                backgroundColor: 'rgba(15,30,24,0.9)',
                borderRadius: '1rem',
                border: '0.05rem solid rgba(76,163,141,0.2)',
                boxShadow: '0 1rem 2.5rem rgba(0,0,0,0.5)',
                p: '1rem',
                zIndex: 2,
                transform: 'rotate(3deg)',
              }}>
                <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', mb: '0.4rem' }}>
                  Ma kölcsönözték
                </Typography>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#4ca38d', lineHeight: 1 }}>
                  24
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', mt: '0.2rem' }}>
                  tétel
                </Typography>
                <Box sx={{
                  mt: '0.75rem', height: '0.3rem', borderRadius: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}>
                  <Box sx={{
                    width: '68%', height: '100%',
                    background: 'linear-gradient(90deg, #4ca38d, #7eddc8)',
                    borderRadius: '1rem',
                  }} />
                </Box>
              </Box>

              <Box className="hero-card-2" sx={{
                position: 'absolute',
                top: '1.5rem', right: '1rem',
                width: '9rem',
                backgroundColor: 'rgba(15,30,24,0.9)',
                borderRadius: '1rem',
                border: '0.05rem solid rgba(76,163,141,0.15)',
                boxShadow: '0 1rem 2.5rem rgba(0,0,0,0.5)',
                p: '1rem',
                zIndex: 2,
                transform: 'rotate(-1deg)',
              }}>
                <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', mb: '0.4rem' }}>
                  Aktív olvasók
                </Typography>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#7eddc8', lineHeight: 1 }}>
                  142
                </Typography>
                <Box sx={{
                  display: 'flex', gap: '-0.3rem', mt: '0.6rem',
                }}>
                  {['#4ca38d', '#3b82f6', '#a855f7', '#eab308'].map((c, i) => (
                    <Box key={i} sx={{
                      width: '1.4rem', height: '1.4rem', borderRadius: '50%',
                      backgroundColor: c, opacity: 0.85,
                      border: '0.1rem solid rgba(15,30,24,0.8)',
                      ml: i > 0 ? '-0.4rem' : 0,
                    }} />
                  ))}
                </Box>
              </Box>

            </Box>

          </Box>
        </Container>

        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '5rem',
          background: 'linear-gradient(to bottom, transparent, #0a1410)',
          pointerEvents: 'none',
        }} />
      </Box>
    </>
  );
}

export default HeroSection;