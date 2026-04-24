import * as React from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ItemCard from '../../ui/ItemCard';
import ItemDetails from '../../ui/ItemDetails';
import { useNavigate } from 'react-router-dom';

function FeaturedItems() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/api/items/featured')
      .then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        py: '10rem',
        backgroundColor: '#0d1a15',
      }}>
        <CircularProgress sx={{ color: '#4ca38d' }} size="2.5rem" />
        <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
          Tartalom betöltése...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <style>{`
        @keyframes featFadeUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feat-card-wrap {
          animation: featFadeUp 0.5s ease both;
        }
        .feat-card-wrap:nth-child(1) { animation-delay: 0.05s; }
        .feat-card-wrap:nth-child(2) { animation-delay: 0.15s; }
        .feat-card-wrap:nth-child(3) { animation-delay: 0.25s; }
        .feat-card-wrap:nth-child(4) { animation-delay: 0.35s; }
        .feat-card-wrap:nth-child(5) { animation-delay: 0.45s; }
        .feat-card-wrap:nth-child(6) { animation-delay: 0.55s; }
        .feat-all-btn {
          transition: all 0.25s ease !important;
        }
        .feat-all-btn:hover {
          box-shadow: 0 0 1rem rgba(76,163,141,0.35) !important;
          transform: translateY(-0.1rem);
        }
      `}</style>

      <Box sx={{
        py: '4rem',
        backgroundColor: '#0d1a15',
        position: 'relative',
        overflow: 'hidden',
      }}>

        <Box sx={{
          position: 'absolute',
          top: '-6rem',
          right: '-6rem',
          width: '28rem',
          height: '28rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,163,141,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          px: { xs: '1.5rem', md: '4rem' },
          mb: '0.75rem',
        }}>
          <Box>
            <Typography sx={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12rem',
              textTransform: 'uppercase',
              color: '#4ca38d',
              mb: '0.5rem',
            }}>
              Válogatás
            </Typography>
            <Typography variant="h3" sx={{
              fontWeight: 800,
              fontFamily: 'serif',
              color: 'white',
              fontSize: { xs: '2rem', md: '2.6rem' },
              lineHeight: 1.15,
            }}>
              Kiemelt ajánlataink
            </Typography>
          </Box>

          <Button
            className="feat-all-btn"
            variant="outlined"
            endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
            onClick={() => navigate('/katalogus')}
            sx={{
              borderRadius: '0.6rem',
              borderColor: 'rgba(76,163,141,0.35)',
              color: '#7eddc8',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: '1.25rem',
              py: '0.5rem',
              mb: '0.25rem',
              '&:hover': {
                borderColor: '#4ca38d',
                backgroundColor: 'rgba(76,163,141,0.08)',
                color: '#7eddc8',
              },
            }}
          >
            Összes megtekintése
          </Button>
        </Box>

        <Typography sx={{
          px: { xs: '1.5rem', md: '4rem' },
          mb: '3rem',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '1rem',
          fontWeight: 400,
        }}>
          Fedezze fel legújabb és legnépszerűbb könyveinket
        </Typography>

        <Box sx={{
          px: { xs: '1.5rem', md: '4rem' },
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'flex-start',
        }}>
          {items.map((item) => (
            <Box
              key={item.itemId}
              className="feat-card-wrap"
              sx={{
                flex: '1 1 22rem',
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 0.75rem)',
                  lg: 'calc(33.33% - 1rem)',
                },
                display: 'flex',
              }}
            >
              <ItemCard item={item} onOpenDetails={() => handleOpenDetails(item)} />
            </Box>
          ))}
        </Box>

        {items.length === 0 && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: '5rem',
            gap: '1rem',
          }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '1rem' }}>
              Jelenleg nincsenek kiemelt ajánlatok.
            </Typography>
            <Button
              onClick={() => navigate('/katalogus')}
              sx={{
                color: '#4ca38d',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { backgroundColor: 'rgba(76,163,141,0.08)' },
              }}
            >
              Böngésszen a katalógusban
            </Button>
          </Box>
        )}

        <ItemDetails
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          item={selectedItem}
        />
      </Box>
    </>
  );
}

export default FeaturedItems;