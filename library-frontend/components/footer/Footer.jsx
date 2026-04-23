import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#449682',
        color: 'white',
        pt: 8,
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: { xs: 'center'},
            gap: 6,
            mb: 6
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  p: 1, 
                  borderRadius: '0.5rem',
                  display: 'flex' 
                }}
              >
                <MenuBookIcon />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'serif' }}>
                Könyvtár
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '300px' }}>
              A tudás kapuja. Fedezze fel könyvtárunk gazdag gyűjteményét, és csatlakozzon olvasóink közösségéhez.
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontFamily: 'serif' }}>
              Gyors linkek
            </Typography>
            <Stack spacing={1.5}>
              {['Katalógus', 'Keresés', 'Bejelentkezés'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  underline="none" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    transition: '0.3s',
                    '&:hover': { color: 'white', pl: 1 } 
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontFamily: 'serif' }}>
              Kapcsolat
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <LocationOnIcon sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  1234 Budapest, Könyv utca 1.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  +36 1 234 5678
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  info@konyvtar.hu
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
        >
          © 2026 Könyvtár. Minden jog fenntartva.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;