import * as React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RegistrationSection() {
  return (
    <Box
      sx={{
        paddingTop: { xs: '5rem', md: '8rem' },
        paddingBottom: { xs: '5rem', md: '8rem' },
        background: 'radial-gradient(circle at center, #1a2e26 0%, #0F1916 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: '3rem' 
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              fontFamily: 'serif',
              marginBottom: '1.5rem',
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' }
            }}
          >
            Készen áll a csatlakozásra?
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '1.1rem',
              maxWidth: '37.5rem', 
              lineHeight: 1.6
            }}
          >
            Regisztráljon most, és kezdje el felfedezni könyvtárunk gazdag gyűjteményét.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: '#eab308',
              color: '#0F1916',
              paddingLeft: '2.5rem',
              paddingRight: '2.5rem',
              paddingTop: '0.9rem',
              paddingBottom: '0.9rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1.1rem',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: '18.75rem',
              boxShadow: '0 0.625rem 0.9375rem -0.1875rem rgba(234, 179, 8, 0.3)',
              '&:hover': {
                backgroundColor: '#ca8a04',
              }
            }}
          >
            Regisztráció
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: '#eab308',
              color: '#eab308',
              paddingLeft: '2.5rem',
              paddingRight: '2.5rem',
              paddingTop: '0.9rem',
              paddingBottom: '0.9rem',
              borderRadius: '0.75rem',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              borderWidth: '0.125rem',
              width: { xs: '100%', sm: 'auto' },
              maxWidth: '18.75rem',
              '&:hover': {
                borderWidth: '0.125rem',
                borderColor: '#ca8a04',
                backgroundColor: 'rgba(234, 179, 8, 0.05)',
              }
            }}
          >
            Katalógus böngészése
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default RegistrationSection;