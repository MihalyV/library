import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Divider 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { api } from '../../services/api';

function Profil() {
  const [userData, setUserData] = useState({ firstName: '', email: '' });
  const [borrowedCount, setBorrowedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('library_token');
    
    if (!token) {
      navigate('/bejelentkezes');
      return;
    }

    const firstName = localStorage.getItem('user_first_name') || 'Felhasználó';
    const email = localStorage.getItem('user_email') || 'felhasznalo@email.hu';
    setUserData({ firstName, email });

    const fetchLoans = async () => {
      try {
        const loans = await api.getMyLoans();
        setBorrowedCount(loans.length);
      } catch (error) {
        console.error("Nem sikerült betölteni a kölcsönzéseket", error);
      }
    };

    fetchLoans();
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: '1rem',
          backgroundColor: '#15221d',
          border: '1px solid rgba(76, 163, 141, 0.2)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              backgroundColor: '#4ca38d',
              mb: 2
            }}
          >
            <PersonIcon sx={{ fontSize: '4rem', color: '#0a1410' }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', fontFamily: 'serif' }}>
            {userData.firstName}
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', mt: 1 }}>
            Könyvtári tag
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailOutlinedIcon sx={{ color: '#4ca38d', mr: 2, fontSize: '2rem' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>
                  E-mail cím
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#f3f4f6' }}>
                  {userData.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalLibraryOutlinedIcon sx={{ color: '#4ca38d', mr: 2, fontSize: '2rem' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>
                  Kikölcsönzött könyvek
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#f3f4f6' }}>
                  {borrowedCount > 0 ? `${borrowedCount} db aktív kölcsönzés` : 'Jelenleg nincs aktív kölcsönzés'}
                </Typography>
                {borrowedCount > 0 && (
                  <Button 
                    onClick={() => navigate('/konyvespolc')}
                    sx={{ color: '#4ca38d', p: 0, minWidth: 0, mt: 0.5, textTransform: 'none', fontWeight: 600 }}
                  >
                    Megtekintés
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="error"
            sx={{
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: '0.6rem',
              px: 4,
              py: 1,
              borderColor: 'rgba(239, 68, 68, 0.5)',
              '&:hover': {
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)'
              }
            }}
          >
            Kijelentkezés
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profil;