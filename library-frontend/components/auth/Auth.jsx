import * as React from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  IconButton, Stack, MenuItem, Select, InputAdornment, 
  Paper, Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import ShieldIcon from '@mui/icons-material/Shield';

function Auth() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [accountType, setAccountType] = React.useState('Olvasó');

  const handleToggle = (status) => setIsLogin(status);

  const inputStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '0.75rem',
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#4ca38d' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.5)' },
    '& .MuiInputBase-input': { py: 1.5 }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#0a1410', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      p: 2
    }}>
      <Container maxWidth="sm">
        <Link 
          href="/" 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: 'rgba(255,255,255,0.6)', 
            textDecoration: 'none',
            mb: 3,
            fontSize: '0.8rem',
            '&:hover': { color: 'white' }
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }} /> Vissza a főoldalra
        </Link>

        <Paper sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          p: { xs: 3, md: 5 },
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Box sx={{ 
              backgroundColor: '#4ca38d', 
              p: 1.5, 
              borderRadius: '0.75rem', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MenuBookIcon sx={{ color: '#0a1410', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'serif', color:'white' }}>
              Könyvtár
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              Jelentkezzen be, vagy hozzon létre új fiókot
            </Typography>
          </Stack>

          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
            p: 0.5, 
            borderRadius: '0.75rem', 
            display: 'flex',
            mb: 4
          }}>
            <Button 
              fullWidth 
              onClick={() => handleToggle(true)}
              sx={{ 
                borderRadius: '0.6rem',
                textTransform: 'none',
                py: 1,
                backgroundColor: isLogin ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                color: isLogin ? 'white' : 'rgba(255, 255, 255, 0.4)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
              }}
            >
              Bejelentkezés
            </Button>
            <Button 
              fullWidth 
              onClick={() => handleToggle(false)}
              sx={{ 
                borderRadius: '0.6rem',
                textTransform: 'none',
                py: 1,
                backgroundColor: !isLogin ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                color: !isLogin ? 'white' : 'rgba(255, 255, 255, 0.4)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
              }}
            >
              Regisztráció
            </Button>
          </Box>

          <Stack spacing={2.5}>
            {!isLogin && (
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Teljes név</Typography>
                <TextField fullWidth placeholder="Kovács János" sx={inputStyle} />
              </Box>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>E-mail cím</Typography>
                <TextField fullWidth placeholder="pelda@email.hu" sx={inputStyle} />
              </Box>
              {!isLogin && (
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Telefonszám</Typography>
                  <TextField fullWidth placeholder="+36 30 123 4567" sx={inputStyle} />
                </Box>
              )}
            </Stack>

            {!isLogin && (
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Életkor</Typography>
                  <TextField fullWidth placeholder="25" type="number" sx={inputStyle} />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Fiók típusa</Typography>
                  <Select
                    fullWidth
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        {accountType === 'Könyvtáros' ? <MenuBookIcon sx={{ color: 'white', fontSize: 18, ml: 1 }} /> : <PersonOutlineIcon sx={{ color: 'white', fontSize: 18, ml: 1 }} />}
                      </InputAdornment>
                    }
                    sx={{ 
                      ...inputStyle,
                      '& .MuiSelect-select': { py: 1.5, color: 'white' },
                      '& .MuiSvgIcon-root': { color: 'white' }
                    }}
                  >
                    <MenuItem value="Olvasó">Olvasó</MenuItem>
                    <MenuItem value="Könyvtáros">Könyvtáros</MenuItem>
                  </Select>
                </Box>
              </Stack>
            )}

            {!isLogin && accountType === 'Könyvtáros' && (
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" sx={{ color: 'white', mb: 0.5, display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  <ShieldIcon sx={{ fontSize: 12, mr: 0.5, color: '#fbc02d' }} /> Könyvtárosi meghívó kód
                </Typography>
                <TextField fullWidth placeholder="XXXX-XXXX-XXXX" sx={inputStyle} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mt: 0.5, display: 'block' }}>
                  A kódot a főkönyvtárostól kaphatja meg.
                </Typography>
              </Box>
            )}

            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Jelszó</Typography>
              <TextField 
                fullWidth 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••" 
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {!isLogin && (
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Jelszó megerősítése</Typography>
                <TextField fullWidth type="password" placeholder="••••••••" sx={inputStyle} />
              </Box>
            )}

            <Button 
              fullWidth 
              variant="contained"
              sx={{ 
                backgroundColor: '#4ca38d', 
                color: '#0a1410', 
                fontWeight: 700,
                py: 1.8,
                borderRadius: '0.75rem',
                textTransform: 'none',
                fontSize: '0.9rem',
                mt: 2,
                '&:hover': { backgroundColor: '#3d8270' }
              }}
            >
              {isLogin ? 'Bejelentkezés' : 'Regisztráció'}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Auth;