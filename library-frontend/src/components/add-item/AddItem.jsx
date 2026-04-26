import {
  Box, Typography, TextField, Button, MenuItem,
  CircularProgress, Alert, Snackbar, FormControlLabel, Switch, Autocomplete, Chip
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const FIELD_SX = {
  '& .MuiOutlinedInput-root': {
    color: '#e2e8f0',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '0.6rem',
    '& fieldset': { borderColor: 'rgba(76,163,141,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(76,163,141,0.45)' },
    '&.Mui-focused fieldset': { borderColor: '#4ca38d', borderWidth: '0.1rem' },
  },
  '& .MuiInputLabel-root': { color: '#64748b' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#4ca38d' },
  '& .MuiAutocomplete-endAdornment .MuiIconButton-root': { color: '#4ca38d' },
  '& .MuiChip-root': {
    backgroundColor: 'rgba(76,163,141,0.2)',
    border: '0.05rem solid rgba(76,163,141,0.3)',
    '& .MuiChip-label': { color: '#ffffff' },
    '& .MuiChip-deleteIcon': {
      color: 'rgba(255,255,255,0.7)',
      '&:hover': { color: '#ffffff' }
    },
    '&:focus': {
      backgroundColor: 'rgba(76,163,141,0.35)',
    }
  }
};

const AUTOCOMPLETE_PAPER_SX = {
  backgroundColor: '#0d1f18',
  border: '0.05rem solid rgba(76,163,141,0.2)',
  borderRadius: '0.75rem',
  boxShadow: '0 1rem 2rem rgba(0,0,0,0.6)',
  '& .MuiAutocomplete-listbox': {
    color: '#cbd5e1',
    '& .MuiAutocomplete-option': {
      fontSize: '0.9rem',
      '&:hover': { backgroundColor: 'rgba(76,163,141,0.1) !important', color: '#7eddc8' },
      '&[aria-selected="true"]': { backgroundColor: 'rgba(76,163,141,0.2) !important', color: '#7eddc8' },
    },
  },
};

function AddItem() {
  const [form, setForm] = useState({
    title: '',
    ISBN: '',
    featured: false,
    itemType: null,
    genres: [],
    authors: [],
    shortDescription: '',
    longDescription: '',
    minAge: '',
  });

  const [types, setTypes] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [t, g, a] = await Promise.all([
          api.getItemTypes(),
          api.getItemGenres(),
          api.getAuthors(),
        ]);
        setTypes(t);
        setGenresList(g);
        setAuthorsList(a);
      } catch {
        setSnack({ open: true, msg: 'Hiba az adatok betöltésekor.', severity: 'error' });
      } finally {
        setFetchLoading(false);
      }
    };
    fetchMeta();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.itemType || !form.shortDescription || !form.longDescription || !form.minAge) {
      setSnack({ open: true, msg: 'Minden kötelező mezőt tölts ki!', severity: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        ISBN: form.ISBN || null,
        featured: form.featured,
        itemType: typeof form.itemType === 'string' 
          ? { itemType: form.itemType } 
          : { typeId: form.itemType.typeId },
        genres: form.genres.map(g => 
          typeof g === 'string' ? { genreType: g } : { genreId: g.genreId }
        ),
        author: form.authors.map(a => 
          typeof a === 'string' ? { authorName: a } : { authorId: a.authorId }
        ),
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
        minAge: parseInt(form.minAge, 10),
      };

      await api.addItem(payload);
      setSnack({ open: true, msg: 'Sikeres mentés!', severity: 'success' });
      setForm({
        title: '', ISBN: '', featured: false, itemType: null,
        genres: [], authors: [], shortDescription: '', longDescription: '', minAge: '',
      });
    } catch (err) {
      setSnack({ open: true, msg: err.message || 'Hiba történt.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="container">
        <Box className="card">
          <Box className="header">
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem',
              backgroundColor: 'rgba(76,163,141,0.12)', border: '0.05rem solid rgba(76,163,141,0.25)'
            }}>
              <AutoStoriesIcon sx={{ color: '#4ca38d', fontSize: '1.4rem' }} />
            </Box>
            <Box>
              <Typography sx={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'serif' }}>
                Új Tétel Hozzáadása
              </Typography>
              <Typography sx={{ color: '#4ca38d', fontSize: '0.8rem' }}>Könyvtárosi panel</Typography>
            </Box>
          </Box>

          {fetchLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: '5rem' }}>
              <CircularProgress sx={{ color: '#4ca38d' }} />
            </Box>
          ) : (
            <Box className="form-content">
              <div className="row">
                <TextField
                  label="Cím *"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  sx={FIELD_SX}
                />
                <TextField
                  label="ISBN"
                  value={form.ISBN}
                  onChange={(e) => setForm({...form, ISBN: e.target.value})}
                  sx={FIELD_SX}
                />
              </div>

              <div className="row">
                <Autocomplete
                  freeSolo
                  options={types}
                  getOptionLabel={(opt) => opt.itemType || opt}
                  value={form.itemType}
                  onChange={(e, val) => setForm({...form, itemType: val})}
                  renderInput={(params) => <TextField {...params} label="Típus *" sx={FIELD_SX} />}
                  slotProps={{ paper: { sx: AUTOCOMPLETE_PAPER_SX } }}
                />
                <TextField
                  label="Minimális életkor *"
                  type="number"
                  value={form.minAge}
                  onChange={(e) => setForm({...form, minAge: e.target.value})}
                  sx={FIELD_SX}
                />
              </div>

              <Autocomplete
                multiple
                freeSolo
                options={genresList}
                getOptionLabel={(opt) => opt.genreType || opt}
                value={form.genres}
                onChange={(e, val) => setForm({...form, genres: val})}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      label={option.genreType || option} 
                      {...getTagProps({ index })} 
                      sx={{ 
                        '& .MuiChip-label': { color: '#ffffff !important' }
                      }}
                    />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Műfajok" sx={FIELD_SX} />}
                slotProps={{ paper: { sx: AUTOCOMPLETE_PAPER_SX } }}
              />

              <Autocomplete
                multiple
                freeSolo
                options={authorsList}
                getOptionLabel={(opt) => opt.authorName || opt}
                value={form.authors}
                onChange={(e, val) => setForm({...form, authors: val})}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      label={option.authorName || option} 
                      {...getTagProps({ index })} 
                      sx={{ 
                        '& .MuiChip-label': { color: '#ffffff !important' }
                      }}
                    />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Szerzők" sx={FIELD_SX} />}
                slotProps={{ paper: { sx: AUTOCOMPLETE_PAPER_SX } }}
              />

              <TextField
                label="Rövid leírás *"
                multiline
                rows={2}
                value={form.shortDescription}
                onChange={(e) => setForm({...form, shortDescription: e.target.value})}
                sx={FIELD_SX}
              />

              <TextField
                label="Hosszú leírás *"
                multiline
                rows={4}
                value={form.longDescription}
                onChange={(e) => setForm({...form, longDescription: e.target.value})}
                sx={FIELD_SX}
              />

              <div className="submit-area">
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.featured}
                      onChange={(e) => setForm({...form, featured: e.target.checked})}
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#4ca38d' }, 
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4ca38d' } 
                      }}
                    />
                  }
                  label={<Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>Kiemelt tétel</Typography>}
                />

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} sx={{ color: '#0a1410' }} /> : <AddCircleOutlineIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #4ca38d 0%, #3d8270 100%)',
                    color: '#0a1410', 
                    fontWeight: 700, 
                    borderRadius: '0.6rem', 
                    px: '2rem', 
                    py: '0.7rem',
                    textTransform: 'none',
                    '&:hover': { background: 'linear-gradient(135deg, #5ab89f 0%, #4a9a85 100%)' },
                    '&.Mui-disabled': { background: 'rgba(76,163,141,0.25)', color: 'rgba(10,20,16,0.5)' }
                  }}
                >
                  {loading ? 'Mentés...' : 'Tétel hozzáadása'}
                </Button>
              </div>
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snack.severity} 
          sx={{ 
            borderRadius: '0.75rem',
            backgroundColor: snack.severity === 'success' ? '#0d1f18' : 'inherit',
            color: snack.severity === 'success' ? '#7eddc8' : 'inherit',
            border: `0.05rem solid ${snack.severity === 'success' ? 'rgba(76,163,141,0.4)' : 'transparent'}`
          }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddItem;