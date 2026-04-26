import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { api } from '../../services/api';

function Bookshelf() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("library_wishlist") || "[]");
      setWishlist(saved);
    } catch {
      setWishlist([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('library_token');
    if (!token) {
      navigate('/bejelentkezes');
      return;
    }
    setUserName(localStorage.getItem('user_first_name') || 'Felhasználó');

    const fetchLoans = async () => {
      try {
        const loans = await api.getMyLoans();
        setBorrowedBooks(Array.isArray(loans) ? loans : []);
      } catch (error) {
        setBorrowedBooks([]);
      }
    };

    fetchLoans();
    loadWishlist();

    const handleStorage = () => loadWishlist();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate]);

  const removeFromWishlist = (itemId) => {
    try {
      const saved = JSON.parse(localStorage.getItem("library_wishlist") || "[]");
      const updated = saved.filter(s => s.itemId !== itemId);
      localStorage.setItem("library_wishlist", JSON.stringify(updated));
      setWishlist(updated);
    } catch {
    }
  };

  const panelStyle = {
    flex: 1,
    p: '2rem',
    borderRadius: '1.5rem',
    backgroundColor: 'rgba(21, 34, 29, 0.6)',
    backdropFilter: 'blur(0.625rem)',
    border: '0.0625rem solid rgba(76, 163, 141, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    '&:hover': {
      border: '0.0625rem solid rgba(76, 163, 141, 0.3)',
    }
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: '1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '1rem',
    border: '0.0625rem solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      transform: 'translateX(0.25rem)'
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: '4rem' }}>
      <Box sx={{ mb: '3rem', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 800, 
          color: 'white', 
          fontFamily: 'serif', 
          fontSize: '3rem',
          mb: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          {userName} polca
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(156, 163, 175, 0.8)', fontSize: '1.1rem' }}>
          Kezeld a nálad lévő köteteket és a jövőbeli olvasmányaidat egy helyen.
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' }, 
        gap: '2rem',
        alignItems: 'stretch'
      }}>

        <Paper elevation={0} sx={panelStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '2rem', gap: '1rem' }}>
            <Avatar sx={{ bgcolor: 'rgba(76, 163, 141, 0.1)', width: '3.5rem', height: '3.5rem' }}>
              <LibraryBooksIcon sx={{ color: '#4ca38d', fontSize: '1.75rem' }} />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>Aktív olvasmányok</Typography>
              <Typography variant="caption" sx={{ color: '#4ca38d', fontWeight: 600, textTransform: 'uppercase' }}>
                {borrowedBooks.length} tétel nálad
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((loan) => {
                const book = loan.itemCopy?.item;
                return (
                  <Box key={loan.loanId} sx={itemStyle}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <AutoStoriesOutlinedIcon sx={{ color: 'rgba(76, 163, 141, 0.5)' }} />
                      <Box>
                        <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                          {book?.title || "Ismeretlen cím"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 0.7)' }}>
                          {book?.author?.map(a => a.authorName).join(", ") || "Ismeretlen szerző"}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label="Aktív" 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(76, 163, 141, 0.15)', 
                        color: '#4ca38d', 
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        border: '0.0625rem solid rgba(76, 163, 141, 0.2)' 
                      }} 
                    />
                  </Box>
                );
              })
            ) : (
              <Box sx={{ textAlign: 'center', py: '3rem' }}>
                <Typography variant="body1" sx={{ color: 'rgba(156, 163, 175, 0.5)', mb: '1.5rem' }}>
                  Üres a polcod... ideje keresni valamit!
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={() => navigate('/katalogus')}
                  sx={{
                    borderColor: '#4ca38d',
                    color: '#4ca38d',
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: '0.75rem',
                    px: '1.5rem',
                    '&:hover': { borderColor: '#3d8270', bgcolor: 'rgba(76, 163, 141, 0.05)' }
                  }}
                >
                  Katalógus
                </Button>
              </Box>
            )}
          </Box>
        </Paper>

        <Paper elevation={0} sx={panelStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '2rem', gap: '1rem' }}>
            <Avatar sx={{ bgcolor: 'rgba(76, 163, 141, 0.1)', width: '3.5rem', height: '3.5rem' }}>
              <BookmarkIcon sx={{ color: '#4ca38d', fontSize: '1.75rem' }} />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>Kívánságlista</Typography>
              <Typography variant="caption" sx={{ color: '#4ca38d', fontWeight: 600, textTransform: 'uppercase' }}>
                {wishlist.length} mentett ötlet
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {wishlist.length > 0 ? (
              wishlist.map((savedItem) => (
                <Box key={savedItem.itemId} sx={itemStyle}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <BookmarkIcon sx={{ color: 'rgba(76, 163, 141, 0.3)', fontSize: '1.2rem' }} />
                    <Box>
                      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                        {savedItem.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(156, 163, 175, 0.7)' }}>
                        {savedItem.author?.map(a => a.authorName).join(", ") || "Ismeretlen szerző"}
                      </Typography>
                    </Box>
                  </Box>
                  <Tooltip title="Eltávolítás">
                    <IconButton
                      size="small"
                      onClick={() => removeFromWishlist(savedItem.itemId)}
                      sx={{
                        color: 'rgba(239, 68, 68, 0.4)',
                        '&:hover': { color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                      }}
                    >
                      <BookmarkRemoveIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: '3rem', 
                border: '0.125rem dashed rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem'
              }}>
                <Typography variant="body1" sx={{ color: 'rgba(156, 163, 175, 0.4)' }}>
                  Még nem mentettél el semmit.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>

      </Box>
    </Container>
  );
}

export default Bookshelf;