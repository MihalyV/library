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
  Tooltip
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
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
        console.error("Hiba a kölcsönzések lekérésekor", error);
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
      // silent
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', fontFamily: 'serif', mb: 1 }}>
          {userName} könyvespolca
        </Typography>
        <Typography variant="body1" sx={{ color: '#9ca3af' }}>
          Itt találod a jelenleg nálad lévő és a későbbre elmentett könyveidet.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 4,
            borderRadius: '1.25rem',
            backgroundColor: '#15221d',
            border: '1px solid rgba(76, 163, 141, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Box sx={{ p: 1.5, backgroundColor: 'rgba(76, 163, 141, 0.1)', borderRadius: '0.75rem' }}>
              <LibraryBooksIcon sx={{ color: '#4ca38d', fontSize: '2rem' }} />
            </Box>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
              Kikölcsönzött könyvek
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2, gap: 2 }}>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((loan) => {
                const book = loan.itemCopy?.item;
                const bookTitle = book?.title || "Ismeretlen cím";
                const authors = book?.author?.length
                  ? book.author.map((a) => a.authorName).join(", ")
                  : "Ismeretlen szerző";

                return (
                  <Box
                    key={loan.loanId}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AutoStoriesOutlinedIcon sx={{ color: '#9ca3af' }} />
                      <Box>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{bookTitle}</Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>{authors}</Typography>
                      </Box>
                    </Box>
                    <Chip label="Aktív" size="small" sx={{ backgroundColor: 'rgba(76, 163, 141, 0.2)', color: '#4ca38d', fontWeight: 600 }} />
                  </Box>
                );
              })
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                <Typography variant="body1" sx={{ color: '#9ca3af', mb: 3, textAlign: 'center' }}>
                  Jelenleg nincs aktív kölcsönzésed.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/katalogus')}
                  sx={{
                    backgroundColor: '#4ca38d',
                    color: '#0a1410',
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: '0.6rem',
                    px: 3,
                    '&:hover': { backgroundColor: '#3d8270' }
                  }}
                >
                  Katalógus böngészése
                </Button>
              </Box>
            )}
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 4,
            borderRadius: '1.25rem',
            backgroundColor: '#15221d',
            border: '1px solid rgba(76, 163, 141, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <Box sx={{ p: 1.5, backgroundColor: 'rgba(76, 163, 141, 0.1)', borderRadius: '0.75rem' }}>
              <BookmarkIcon sx={{ color: '#4ca38d', fontSize: '2rem' }} />
            </Box>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
              Kívánságlista
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2, gap: 2 }}>
            {wishlist.length > 0 ? (
              wishlist.map((savedItem) => {
                const authors = savedItem.author?.length
                  ? savedItem.author.map((a) => a.authorName).join(", ")
                  : "Ismeretlen szerző";

                return (
                  <Box
                    key={savedItem.itemId}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AutoStoriesOutlinedIcon sx={{ color: '#9ca3af' }} />
                      <Box>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>{savedItem.title}</Typography>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>{authors}</Typography>
                      </Box>
                    </Box>
                    <Tooltip title="Eltávolítás">
                      <IconButton
                        size="small"
                        onClick={() => removeFromWishlist(savedItem.itemId)}
                        sx={{
                          color: 'rgba(255,255,255,0.3)',
                          '&:hover': { color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)' }
                        }}
                      >
                        <BookmarkRemoveIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                );
              })
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                <Typography variant="body1" sx={{ color: '#9ca3af', textAlign: 'center' }}>
                  Még nem mentettél el egyetlen tételt sem.
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