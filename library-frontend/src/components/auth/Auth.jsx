import * as React from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  IconButton, Stack, MenuItem, Select, InputAdornment, 
  Paper, Link, Alert, Collapse
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import ShieldIcon from '@mui/icons-material/Shield';
import { api } from '../../services/api';

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [accountType, setAccountType] = React.useState('Olvasó');
  
  const [formData, setFormData] = React.useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: '',
    inviteCode: ''
  });

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleToggle = (status) => {
    setIsLogin(status);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await api.login(formData.email, formData.password);
        navigate('/'); 
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('A két jelszó nem egyezik!');
          return;
        }

        const userData = {
          lastName: formData.lastName,
          firstName: formData.firstName,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
          role: accountType === 'Könyvtáros' ? 'LIBRARIAN' : 'USER'
        };

        await api.register(userData);
        setSuccess('Sikeres regisztráció! Most már bejelentkezhet.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Hiba történt a művelet során.');
    }
  };

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
          onClick={() => navigate('/')}
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: 'rgba(255,255,255,0.6)', 
            cursor: 'pointer',
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
            <Box sx={{ backgroundColor: '#4ca38d', p: 1.5, borderRadius: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <MenuBookIcon sx={{ color: '#0a1410', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'serif', color:'white' }}>
              Könyvtár
            </Typography>
            
            <Collapse in={!!error || !!success} sx={{ width: '100%' }}>
              {error && <Alert severity="error" sx={{ borderRadius: '0.75rem', mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ borderRadius: '0.75rem', mb: 2 }}>{success}</Alert>}
            </Collapse>
          </Stack>

          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', p: 0.5, borderRadius: '0.75rem', display: 'flex', mb: 4 }}>
            <Button fullWidth onClick={() => handleToggle(true)} sx={{ borderRadius: '0.6rem', textTransform: 'none', py: 1, backgroundColor: isLogin ? 'rgba(255, 255, 255, 0.05)' : 'transparent', color: isLogin ? 'white' : 'rgba(255, 255, 255, 0.4)' }}>
              Bejelentkezés
            </Button>
            <Button fullWidth onClick={() => handleToggle(false)} sx={{ borderRadius: '0.6rem', textTransform: 'none', py: 1, backgroundColor: !isLogin ? 'rgba(255, 255, 255, 0.05)' : 'transparent', color: !isLogin ? 'white' : 'rgba(255, 255, 255, 0.4)' }}>
              Regisztráció
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              {!isLogin && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box sx={{ flex: 1, textAlign: 'left' }}>
                    <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Vezetéknév</Typography>
                    <TextField fullWidth name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Kovács" sx={inputStyle} required />
                  </Box>
                  <Box sx={{ flex: 1, textAlign: 'left' }}>
                    <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Keresztnév</Typography>
                    <TextField fullWidth name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="János" sx={inputStyle} required />
                  </Box>
                </Stack>
              )}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>E-mail cím</Typography>
                  <TextField fullWidth name="email" value={formData.email} onChange={handleInputChange} placeholder="pelda@email.hu" sx={inputStyle} required />
                </Box>
                {!isLogin && (
                  <Box sx={{ flex: 1, textAlign: 'left' }}>
                    <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Telefonszám</Typography>
                    <TextField fullWidth name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+36 30 123 4567" sx={inputStyle} />
                  </Box>
                )}
              </Stack>

              {!isLogin && (
                <Stack direction="row" spacing={2}>
                  <Box sx={{ flex: 1, textAlign: 'left' }}>
                    <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Életkor</Typography>
                    <TextField fullWidth name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder="25" sx={inputStyle} />
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
                      sx={{ ...inputStyle, '& .MuiSelect-select': { py: 1.5, color: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }}
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
                  <TextField fullWidth name="inviteCode" value={formData.inviteCode} onChange={handleInputChange} placeholder="XXXX-XXXX-XXXX" sx={inputStyle} />
                </Box>
              )}

              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="caption" sx={{ color: 'white', mb: 1, display: 'block', fontWeight: 600 }}>Jelszó</Typography>
                <TextField 
                  fullWidth 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" 
                  sx={inputStyle}
                  required
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
                  <TextField fullWidth name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type="password" placeholder="••••••••" sx={inputStyle} required />
                </Box>
              )}

              <Button 
                fullWidth 
                type="submit"
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
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Auth;