import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, TextField,
  IconButton, Stack, Button, MenuItem, Select, Chip,
  CircularProgress, Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ItemCard from '../../ui/ItemCard';
import ItemDetails from '../../ui/ItemDetails';
import { api } from '../../services/api';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('query') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [inputValue, setInputValue] = useState(queryParam);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTypeId, setSelectedTypeId] = useState('all');

  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoans, setUserLoans] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const itemsData = await api.getItems();
        setItems(Array.isArray(itemsData) ? itemsData : []);

        const uniqueGenres = [];
        const seenGenreIds = new Set();
        const uniqueTypes = [];
        const seenTypeIds = new Set();

        (Array.isArray(itemsData) ? itemsData : []).forEach((item) => {
          if (item.genre) {
            item.genre.forEach((g) => {
              if (!seenGenreIds.has(g.genreId)) {
                seenGenreIds.add(g.genreId);
                uniqueGenres.push(g);
              }
            });
          }
          if (item.itemType && !seenTypeIds.has(item.itemType.typeId)) {
            seenTypeIds.add(item.itemType.typeId);
            uniqueTypes.push(item.itemType);
          }
        });

        setGenres(uniqueGenres);
        setTypes(uniqueTypes);

        const token = localStorage.getItem('library_token');
        if (token) {
          try {
            const loansData = await api.getMyLoans();
            setUserLoans(Array.isArray(loansData) ? loansData : []);
          } catch {
            setUserLoans([]);
          }
        }
      } catch (error) {
        console.error('Hiba:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setInputValue(queryParam);
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
    setSearchParams(inputValue ? { query: inputValue } : {});
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setInputValue('');
    setSearchTerm('');
    setSearchParams({});
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedGenreId('all');
    setSelectedStatus('all');
    setSelectedTypeId('all');
    setPage(1);
  };

  const activeFilterCount = [selectedGenreId, selectedStatus, selectedTypeId].filter(v => v !== 'all').length;

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.author && item.author.some(a => a.authorName.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (item.ISBN && item.ISBN.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      selectedTypeId === 'all' ||
      String(item.itemType?.typeId) === String(selectedTypeId);

    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;

    const matchesGenre =
      selectedGenreId === 'all' ||
      (Array.isArray(item.genre) &&
        item.genre.some((g) => String(g.genreId) === String(selectedGenreId)));

    return matchesSearch && matchesType && matchesStatus && matchesGenre;
  });

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const selectSx = {
    backgroundColor: 'rgba(255,255,255,0.04)',
    color: 'white',
    borderRadius: '0.75rem',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(76,163,141,0.4)' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4ca38d' },
    '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.5)' },
  };

  return (
    <Box sx={{ backgroundColor: '#0a1410', minHeight: '100vh', color: 'white' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .search-hero { animation: fadeUp 0.6s ease both; }
        .search-bar { animation: fadeUp 0.6s ease 0.1s both; }
        .search-filters { animation: fadeUp 0.6s ease 0.2s both; }
        .search-results { animation: fadeUp 0.6s ease 0.25s both; }
      `}</style>

      <Box
        sx={{
          position: 'relative',
          pt: '5rem',
          pb: '4rem',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(76,163,141,0.1)',
        }}
      >
        <Box sx={{
          position: 'absolute', top: '-10rem', left: '-10rem',
          width: '40rem', height: '40rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,163,141,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <Box sx={{
          position: 'absolute', bottom: '-8rem', right: '-5rem',
          width: '30rem', height: '30rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,163,141,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(76,163,141,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(76,163,141,0.02) 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
          pointerEvents: 'none',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box className="search-hero" sx={{ textAlign: 'center', mb: '3rem' }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'rgba(76,163,141,0.1)',
              border: '1px solid rgba(76,163,141,0.25)',
              borderRadius: '2rem', px: '1rem', py: '0.4rem', mb: '1.5rem',
            }}>
              <AutoStoriesIcon sx={{ fontSize: '0.9rem', color: '#4ca38d' }} />
              <Typography sx={{ fontSize: '0.8rem', color: '#7eddc8', fontWeight: 600, letterSpacing: '0.05rem' }}>
                Könyvtári keresés
              </Typography>
            </Box>

            <Typography variant="h2" sx={{
              fontWeight: 800, fontFamily: 'serif', mb: '1rem',
              fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.15,
            }}>
              Mit keres{' '}
              <Box component="span" sx={{
                background: 'linear-gradient(135deg, #4ca38d 0%, #7eddc8 50%, #4ca38d 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>
                ma?
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem', maxWidth: '36rem', mx: 'auto' }}>
              Keresés cím, szerző, ISBN alapján – szűrjön műfaj, típus és elérhetőség szerint
            </Typography>
          </Box>

          <Box className="search-bar" sx={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '1.5rem',
            p: '1.25rem',
          }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Box sx={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '0.875rem',
                border: '1px solid rgba(76,163,141,0.15)',
                display: 'flex', alignItems: 'center',
                transition: 'border-color 0.25s ease, background-color 0.25s ease',
                '&:focus-within': {
                  borderColor: 'rgba(76,163,141,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.07)',
                },
              }}>
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.35)', ml: '1rem', flexShrink: 0 }} />
                <TextField
                  fullWidth
                  placeholder="Cím, szerző vagy ISBN..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white', height: '3.5rem', fontSize: '1rem',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
                {inputValue && (
                  <IconButton onClick={clearSearch} sx={{ color: 'rgba(255,255,255,0.3)', mr: '0.5rem', '&:hover': { color: 'white' } }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  background: 'linear-gradient(135deg, #4ca38d 0%, #3d8270 100%)',
                  color: '#0a1410', fontWeight: 700, px: '2rem',
                  height: '3.5rem', borderRadius: '0.875rem',
                  textTransform: 'none', fontSize: '0.95rem', flexShrink: 0,
                  '&:hover': { background: 'linear-gradient(135deg, #5ab89f 0%, #4a9a85 100%)', boxShadow: '0 0 1.5rem rgba(76,163,141,0.4)' },
                  transition: 'all 0.25s ease',
                }}
              >
                Keresés
              </Button>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? 'contained' : 'outlined'}
                startIcon={<TuneIcon />}
                sx={{
                  height: '3.5rem', borderRadius: '0.875rem',
                  textTransform: 'none', fontWeight: 600, px: '1.5rem', flexShrink: 0,
                  ...(showFilters ? {
                    backgroundColor: 'rgba(76,163,141,0.2)',
                    color: '#7eddc8',
                    border: '1px solid rgba(76,163,141,0.4)',
                    '&:hover': { backgroundColor: 'rgba(76,163,141,0.3)' },
                  } : {
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.6)',
                    '&:hover': { borderColor: 'rgba(76,163,141,0.4)', color: 'white', backgroundColor: 'rgba(255,255,255,0.04)' },
                  }),
                }}
              >
                Szűrők
                {activeFilterCount > 0 && (
                  <Box sx={{
                    ml: '0.5rem', backgroundColor: '#4ca38d', color: '#0a1410',
                    borderRadius: '50%', width: '1.3rem', height: '1.3rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800,
                  }}>
                    {activeFilterCount}
                  </Box>
                )}
              </Button>
            </Stack>

            {showFilters && (
              <Box className="search-filters" sx={{
                mt: '1.25rem', pt: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <Box sx={{
                  display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                  gap: '1rem', alignItems: { md: 'flex-end' },
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', mb: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08rem', textTransform: 'uppercase' }}>
                      Műfaj
                    </Typography>
                    <Select fullWidth value={selectedGenreId} onChange={(e) => { setSelectedGenreId(e.target.value); setPage(1); }} sx={selectSx}>
                      <MenuItem value="all">Összes műfaj</MenuItem>
                      {genres.map((g) => (
                        <MenuItem key={g.genreId} value={String(g.genreId)}>{g.genreType}</MenuItem>
                      ))}
                    </Select>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', mb: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08rem', textTransform: 'uppercase' }}>
                      Státusz
                    </Typography>
                    <Select fullWidth value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }} sx={selectSx}>
                      <MenuItem value="all">Összes státusz</MenuItem>
                      <MenuItem value="Elérhető">Elérhető</MenuItem>
                      <MenuItem value="Kikölcsönözve">Kikölcsönözve</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', mb: '0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08rem', textTransform: 'uppercase' }}>
                      Típus
                    </Typography>
                    <Select fullWidth value={selectedTypeId} onChange={(e) => { setSelectedTypeId(e.target.value); setPage(1); }} sx={selectSx}>
                      <MenuItem value="all">Összes típus</MenuItem>
                      {types.map((t) => (
                        <MenuItem key={t.typeId} value={String(t.typeId)}>{t.itemType}</MenuItem>
                      ))}
                    </Select>
                  </Box>

                  {activeFilterCount > 0 && (
                    <Button
                      onClick={resetFilters}
                      sx={{
                        color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: 600,
                        height: '3.5rem', px: '1.25rem', borderRadius: '0.75rem', flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.08)',
                        '&:hover': { color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.06)' },
                      }}
                    >
                      Törlés
                    </Button>
                  )}
                </Box>

                {activeFilterCount > 0 && (
                  <Stack direction="row" spacing={1} sx={{ mt: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedGenreId !== 'all' && (
                      <Chip
                        label={genres.find(g => String(g.genreId) === selectedGenreId)?.genreType}
                        onDelete={() => setSelectedGenreId('all')}
                        size="small"
                        sx={{ backgroundColor: 'rgba(76,163,141,0.15)', color: '#7eddc8', border: '1px solid rgba(76,163,141,0.3)', '& .MuiChip-deleteIcon': { color: '#4ca38d' } }}
                      />
                    )}
                    {selectedStatus !== 'all' && (
                      <Chip
                        label={selectedStatus}
                        onDelete={() => setSelectedStatus('all')}
                        size="small"
                        sx={{ backgroundColor: 'rgba(76,163,141,0.15)', color: '#7eddc8', border: '1px solid rgba(76,163,141,0.3)', '& .MuiChip-deleteIcon': { color: '#4ca38d' } }}
                      />
                    )}
                    {selectedTypeId !== 'all' && (
                      <Chip
                        label={types.find(t => String(t.typeId) === selectedTypeId)?.itemType}
                        onDelete={() => setSelectedTypeId('all')}
                        size="small"
                        sx={{ backgroundColor: 'rgba(76,163,141,0.15)', color: '#7eddc8', border: '1px solid rgba(76,163,141,0.3)', '& .MuiChip-deleteIcon': { color: '#4ca38d' } }}
                      />
                    )}
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: '3rem' }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: '8rem', gap: '1rem' }}>
            <CircularProgress sx={{ color: '#4ca38d' }} size="2.5rem" />
            <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Tartalom betöltése...</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <Box>
                {(searchTerm || activeFilterCount > 0) ? (
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
                    <Box component="span" sx={{ color: '#7eddc8', fontWeight: 700 }}>{filteredItems.length}</Box>
                    {' '}találat
                    {searchTerm && <> – <Box component="span" sx={{ color: 'rgba(255,255,255,0.7)' }}>„{searchTerm}"</Box></>}
                  </Typography>
                ) : (
                  <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.95rem' }}>
                    Összesen{' '}
                    <Box component="span" sx={{ color: '#7eddc8', fontWeight: 700 }}>{items.length}</Box>
                    {' '}tétel a katalógusban
                  </Typography>
                )}
              </Box>
            </Box>

            {currentItems.length > 0 ? (
              <Box className="search-results">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {currentItems.map((item) => (
                    <Box key={item.itemId} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 0.75rem)' } }}>
                      <ItemCard
                        item={item}
                        userLoans={userLoans}
                        onOpenDetails={() => { setSelectedItem(item); setIsDetailsOpen(true); }}
                        onBorrow={() => navigate('/katalogus')}
                      />
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '4rem' }}>
                  <Pagination
                    count={Math.ceil(filteredItems.length / itemsPerPage)}
                    page={page}
                    onChange={(e, v) => { setPage(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    sx={{
                      '& .MuiPaginationItem-root': { color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.1)' },
                      '& .Mui-selected': { backgroundColor: '#4ca38d !important', color: '#0a1410', fontWeight: 700 },
                      '& .MuiPaginationItem-root:hover': { backgroundColor: 'rgba(76,163,141,0.1)', color: 'white' },
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: '8rem' }}>
                <Box sx={{
                  width: '5rem', height: '5rem', borderRadius: '50%',
                  backgroundColor: 'rgba(76,163,141,0.08)',
                  border: '1px solid rgba(76,163,141,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mx: 'auto', mb: '1.5rem',
                }}>
                  <SearchIcon sx={{ fontSize: '2rem', color: 'rgba(76,163,141,0.5)' }} />
                </Box>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', mb: '0.5rem' }}>
                  {searchTerm || activeFilterCount > 0 ? 'Nincs találat' : 'Kezdjen el keresni'}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem' }}>
                  {searchTerm || activeFilterCount > 0
                    ? 'Próbáljon más keresési feltételeket'
                    : 'Írjon be egy keresési kifejezést, vagy használja a szűrőket'}
                </Typography>
                {(searchTerm || activeFilterCount > 0) && (
                  <Button
                    onClick={() => { clearSearch(); resetFilters(); }}
                    sx={{
                      mt: '1.5rem', color: '#4ca38d', textTransform: 'none', fontWeight: 600,
                      '&:hover': { backgroundColor: 'rgba(76,163,141,0.08)' },
                    }}
                  >
                    Szűrők törlése
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Container>

      <ItemDetails
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        item={selectedItem}
      />
    </Box>
  );
}

export default Search;