import * as React from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import ItemCard from './ItemCard';

function FeaturedItems() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost:8080/api/items/featured')
      .then(res => res.json())
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
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#4ca38d' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: '3rem', backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            mb: '4rem',
            fontWeight: 800,
            textAlign: 'center',
            fontFamily: 'serif',
            color: '#0a1410'
          }}
        >
          Kiemelt ajánlataink
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'center'
          }}
        >
          {items.map((data) => (
            <Box
              key={data.itemId}
              sx={{
                flex: '1 1 300px',
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 32px)',
                  md: 'calc(33.33% - 32px)'
                },
                display: 'flex'
              }}
            >
              <ItemCard item={data} />
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
}

export default FeaturedItems;