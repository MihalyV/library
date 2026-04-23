import * as React from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import ItemCard from '../../ui/ItemCard';
import ItemDetails from '../../ui/ItemDetails';

function FeaturedItems() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/api/items/featured')
      .then(resp => resp.json())
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
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10rem', paddingBottom: '10rem', backgroundColor: '#101A17' }}>
        <CircularProgress sx={{ color: '#4ca38d' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: '3rem', paddingBottom: '3rem', backgroundColor: '#101A17' }}>
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingLeft: '4rem', 
          paddingRight: '4rem'
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: '1rem',
            fontWeight: 800,
            textAlign: 'left',
            fontFamily: 'serif',
            color: 'white'
          }}
        >
          Kiemelt ajánlataink
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: "0.5rem",
            backgroundColor: '#202020',
            borderColor: "#a6aaa9",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            padding: '0.5rem 1.5rem',
            "&:hover": {
              backgroundColor: "#939e34",
              color: "black",
              borderColor: "#336b5d",
            },
          }}
        >
          Összes megtekintése
        </Button>
      </Box>

      <Typography
        variant="h5"
        sx={{
          marginBottom: '4rem',
          fontWeight: 800,
          textAlign: 'left',
          fontFamily: 'serif',
          color: 'white',
          paddingLeft: '4rem'
        }}
      >
        Fedezze fel legújabb és legnépszerűbb könyveinket
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'center',
          paddingLeft: '5rem',
          paddingRight: '5rem'
        }}
      >
        {items.map((item) => (
          <Box
            key={item.itemId}
            sx={{
              flex: '1 1 18.75rem',
              maxWidth: {
                xs: '100%',
                sm: 'calc(50% - 2rem)',
                md: 'calc(33.33% - 2rem)'
              },
              display: 'flex'
            }}
          >
            <ItemCard item={item} onOpenDetails={() => handleOpenDetails(item)} />
          </Box>
        ))}
      </Box>

      <ItemDetails 
        open={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        item={selectedItem} 
      />
    </Box>
  );
}

export default FeaturedItems;