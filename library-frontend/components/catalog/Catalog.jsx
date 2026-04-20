import * as React from 'react';
import { 
  Box, Container, Typography, TextField, MenuItem, 
  Select, Pagination, InputAdornment, IconButton, Stack, CircularProgress, 
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ItemCard from '../../ui/ItemCard';
import ItemDetails from '../../ui/ItemDetails';

function Catalog() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 6;

  // Modal állapotok
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [type, setType] = React.useState('Összes típus');

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  React.useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/items') 
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = type === 'Összes típus' || item.itemType?.typeName === type;
    return matchesSearch && matchesType;
  });

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={{ backgroundColor: '#0a1410', minHeight: '100vh', py: '4rem', color: 'white' }}>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ fontWeight: 800, mb: '3rem', fontFamily: 'serif' }}>Katalógus</Typography>

        {/* Szűrők */}
       <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', p: '2rem', borderRadius: '1.25rem', mb: '3rem' }}>
  <Stack 
    direction={{ xs: 'column', md: 'row' }} 
    spacing={2} 
    alignItems="center" // Hogy minden függőlegesen középen legyen
  >
    {/* Keresőmező nagyító ikonnal az elején */}
    <TextField
      fullWidth
      placeholder="Keresés..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Keresésnél érdemes visszaállítani az első oldalra
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#4ca38d' }} />
          </InputAdornment>
        ),
      }}
      sx={{ 
        backgroundColor: '#0a1410', 
        borderRadius: '0.75rem', 
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
            '&:hover fieldset': { borderColor: '#4ca38d' },
        },
        input: { color: 'white' } 
      }}
    />

    {/* Típus választó */}
    <Select 
      value={type} 
      onChange={(e) => {
        setType(e.target.value);
        setPage(1);
      }}
      sx={{ 
        backgroundColor: '#0a1410', 
        color: 'white', 
        borderRadius: '0.75rem', 
        minWidth: '200px',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
        '& .MuiSvgIcon-root': { color: 'white' }
      }}
    >
      <MenuItem value="Összes típus">Összes típus</MenuItem>
      <MenuItem value="Könyv">Könyv</MenuItem>
      <MenuItem value="CD">CD</MenuItem>
    </Select>
  </Stack>
</Box>

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', color: '#4ca38d' }} />
        ) : (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              {currentItems.map((item) => (
                <Box key={item.itemId} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 1rem)' } }}>
                  <ItemCard item={item} onOpenDetails={() => handleOpenDetails(item)} />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '4rem' }}>
              <Pagination 
                count={Math.ceil(filteredItems.length / itemsPerPage)} 
                page={page} 
                onChange={(e, v) => setPage(v)}
                sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
              />
            </Box>
          </>
        )}

        <ItemDetails 
          open={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
          item={selectedItem} 
        />
      </Container>
    </Box>
  );
}

export default Catalog;