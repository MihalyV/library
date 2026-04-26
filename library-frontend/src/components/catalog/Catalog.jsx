import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Select,
  Pagination,
  CircularProgress,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ItemCard from "../../ui/ItemCard";
import ItemDetails from "../../ui/ItemDetails";
import { api } from "../../services/api";

function Catalog() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [userLoans, setUserLoans] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [borrowDialogOpen, setBorrowDialogOpen] = useState(false);
  const [itemToBorrow, setItemToBorrow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedGenreId, setSelectedGenreId] = useState("all");

  const activeFilterCount = [selectedGenreId, selectedStatus, selectedTypeId].filter(v => v !== "all").length;

  const handleBorrowClick = (item) => {
    const token = localStorage.getItem("library_token");
    if (!token) {
      navigate("/bejelentkezes", { state: { message: "A kölcsönzés funkcióhoz bejelentkezés szükséges!" } });
      return;
    }
    setItemToBorrow(item);
    setBorrowDialogOpen(true);
  };

  const confirmBorrow = async () => {
    if (itemToBorrow) {
      try {
        await api.borrowItem(itemToBorrow.itemId);
        setSnackbar({ open: true, message: "Sikeres kölcsönzés!", severity: "success" });
        const loans = await api.getMyLoans();
        setUserLoans(Array.isArray(loans) ? loans : []);
        const updatedItems = await api.getItems();
        setItems(updatedItems);
      } catch (error) {
        setSnackbar({ open: true, message: error.message, severity: "error" });
      }
    }
    setBorrowDialogOpen(false);
    setItemToBorrow(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("library_token");
        const itemsData = await api.getItems();
        setItems(itemsData);

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

        if (token) {
          try {
            const loansData = await api.getMyLoans();
            setUserLoans(Array.isArray(loansData) ? loansData : []);
          } catch {
            setUserLoans([]);
          }
        }
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.author && item.author.some(a => a.authorName.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (item.ISBN && item.ISBN.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedTypeId === "all" || String(item.itemType?.typeId) === String(selectedTypeId);
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesGenre = selectedGenreId === "all" || (Array.isArray(item.genre) && item.genre.some((g) => String(g.genreId) === String(selectedGenreId)));
    return matchesSearch && matchesType && matchesStatus && matchesGenre;
  });

  const currentItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const resetFilters = () => {
    setSelectedGenreId("all");
    setSelectedStatus("all");
    setSelectedTypeId("all");
    setPage(1);
  };

  const selectSx = {
    backgroundColor: "rgba(255,255,255,0.04)",
    color: "white",
    borderRadius: "0.75rem",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(76,163,141,0.4)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4ca38d" },
    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.5)" },
  };

  return (
    <Box sx={{ backgroundColor: "#0a1410", minHeight: "100vh", color: "white" }}>
      <Box sx={{
        position: "relative",
        pt: "5rem",
        pb: "4rem",
        overflow: "hidden",
        borderBottom: "1px solid rgba(76,163,141,0.1)",
      }}>
        <Box sx={{
          position: "absolute", top: "-10rem", right: "-8rem",
          width: "40rem", height: "40rem", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76,163,141,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <Box sx={{
          position: "absolute", bottom: "-6rem", left: "-6rem",
          width: "28rem", height: "28rem", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76,163,141,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <Box sx={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(76,163,141,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(76,163,141,0.02) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
          pointerEvents: "none",
        }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              backgroundColor: "rgba(76,163,141,0.1)",
              border: "1px solid rgba(76,163,141,0.25)",
              borderRadius: "2rem", 
              px: "1rem", 
              py: "0.4rem", 
              mb: "1.5rem",
            }}>
              <LibraryBooksIcon sx={{ fontSize: "0.9rem", color: "#4ca38d" }} />
              <Typography sx={{ fontSize: "0.8rem", color: "#7eddc8", fontWeight: 600, letterSpacing: "0.05rem" }}>
                Teljes gyűjtemény
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              gap: "0.5rem" 
            }}>
              <Typography variant="h2" sx={{
                fontWeight: 800, 
                fontFamily: "serif", 
                mb: "0.5rem",
                fontSize: { xs: "2.2rem", md: "3.2rem" }, 
                lineHeight: 1.15,
              }}>
                Katalógus
              </Typography>
              
              {!loading && (
                <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "1rem" }}>
                  <Box component="span" sx={{ color: "#7eddc8", fontWeight: 700 }}>
                    {filteredItems.length}
                  </Box>
                  {" "}tétel
                  {(searchTerm || activeFilterCount > 0) && items.length !== filteredItems.length && (
                    <Box component="span" sx={{ color: "rgba(255,255,255,0.25)" }}>
                      {" "}/ {items.length} összesen
                    </Box>
                  )}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pt: "2.5rem", pb: "5rem" }}>
        <Box sx={{
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1.5rem",
          p: "1.25rem",
          mb: "2.5rem",
        }}>
          <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Box sx={{
              flex: "1 1 20rem",
              display: "flex", alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "0.875rem",
              border: "1px solid rgba(76,163,141,0.15)",
              transition: "border-color 0.25s ease, background-color 0.25s ease",
              "&:focus-within": {
                borderColor: "rgba(76,163,141,0.5)",
                backgroundColor: "rgba(255,255,255,0.07)",
              },
            }}>
              <SearchIcon sx={{ color: "rgba(255,255,255,0.35)", ml: "1rem", flexShrink: 0 }} />
              <TextField
                fullWidth
                placeholder="Cím, szerző vagy ISBN..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white", height: "3.5rem", fontSize: "1rem",
                    "& fieldset": { border: "none" },
                  },
                }}
              />
              {inputValue && (
                <Box
                  onClick={() => { setInputValue(""); setSearchTerm(""); setPage(1); }}
                  sx={{
                    mr: "0.75rem", cursor: "pointer", color: "rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center",
                    "&:hover": { color: "white" },
                    transition: "color 0.2s ease",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </Box>
              )}
            </Box>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "contained" : "outlined"}
              startIcon={<TuneIcon />}
              sx={{
                height: "3.5rem", borderRadius: "0.875rem",
                textTransform: "none", fontWeight: 600, px: "1.5rem", flexShrink: 0,
                ...(showFilters ? {
                  backgroundColor: "rgba(76,163,141,0.2)",
                  color: "#7eddc8",
                  border: "1px solid rgba(76,163,141,0.4)",
                  "&:hover": { backgroundColor: "rgba(76,163,141,0.3)" },
                } : {
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                  "&:hover": { borderColor: "rgba(76,163,141,0.4)", color: "white", backgroundColor: "rgba(255,255,255,0.04)" },
                }),
              }}
            >
              Szűrők
              {activeFilterCount > 0 && (
                <Box sx={{
                  ml: "0.5rem", backgroundColor: "#4ca38d", color: "#0a1410",
                  borderRadius: "50%", width: "1.3rem", height: "1.3rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 800, flexShrink: 0,
                }}>
                  {activeFilterCount}
                </Box>
              )}
            </Button>
          </Box>

          {showFilters && (
            <Box sx={{
              mt: "1.25rem", pt: "1.25rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
                <Box sx={{ flex: "1 1 10rem" }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", mb: "0.5rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08rem", textTransform: "uppercase" }}>
                    Műfaj
                  </Typography>
                  <Select fullWidth value={selectedGenreId} onChange={(e) => { setSelectedGenreId(e.target.value); setPage(1); }} sx={selectSx}>
                    <MenuItem value="all">Összes műfaj</MenuItem>
                    {genres.map((g) => (
                      <MenuItem key={g.genreId} value={String(g.genreId)}>{g.genreType}</MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ flex: "1 1 10rem" }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", mb: "0.5rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08rem", textTransform: "uppercase" }}>
                    Státusz
                  </Typography>
                  <Select fullWidth value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }} sx={selectSx}>
                    <MenuItem value="all">Összes státusz</MenuItem>
                    <MenuItem value="Elérhető">Elérhető</MenuItem>
                    <MenuItem value="Kikölcsönözve">Kikölcsönözve</MenuItem>
                  </Select>
                </Box>

                <Box sx={{ flex: "1 1 10rem" }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", mb: "0.5rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08rem", textTransform: "uppercase" }}>
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
                      color: "rgba(255,255,255,0.4)", textTransform: "none", fontWeight: 600,
                      height: "3.5rem", px: "1.25rem", borderRadius: "0.75rem", flexShrink: 0,
                      border: "1px solid rgba(255,255,255,0.08)",
                      "&:hover": { color: "#ef4444", borderColor: "rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.06)" },
                    }}
                  >
                    Törlés
                  </Button>
                )}
              </Box>

              {activeFilterCount > 0 && (
                <Box sx={{ display: "flex", gap: "0.5rem", mt: "1rem", flexWrap: "wrap" }}>
                  {selectedGenreId !== "all" && (
                    <Chip
                      label={genres.find(g => String(g.genreId) === selectedGenreId)?.genreType}
                      onDelete={() => setSelectedGenreId("all")}
                      size="small"
                      sx={{ backgroundColor: "rgba(76,163,141,0.15)", color: "#7eddc8", border: "1px solid rgba(76,163,141,0.3)", "& .MuiChip-deleteIcon": { color: "#4ca38d" } }}
                    />
                  )}
                  {selectedStatus !== "all" && (
                    <Chip
                      label={selectedStatus}
                      onDelete={() => setSelectedStatus("all")}
                      size="small"
                      sx={{ backgroundColor: "rgba(76,163,141,0.15)", color: "#7eddc8", border: "1px solid rgba(76,163,141,0.3)", "& .MuiChip-deleteIcon": { color: "#4ca38d" } }}
                    />
                  )}
                  {selectedTypeId !== "all" && (
                    <Chip
                      label={types.find(t => String(t.typeId) === selectedTypeId)?.itemType}
                      onDelete={() => setSelectedTypeId("all")}
                      size="small"
                      sx={{ backgroundColor: "rgba(76,163,141,0.15)", color: "#7eddc8", border: "1px solid rgba(76,163,141,0.3)", "& .MuiChip-deleteIcon": { color: "#4ca38d" } }}
                    />
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "8rem", gap: "1rem" }}>
            <CircularProgress sx={{ color: "#4ca38d" }} size="2.5rem" />
            <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Tartalom betöltése...</Typography>
          </Box>
        ) : currentItems.length > 0 ? (
          <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              {currentItems.map((item) => (
                <Box key={item.itemId} sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 0.75rem)" } }}>
                  <ItemCard
                    item={item}
                    userLoans={userLoans}
                    onOpenDetails={() => { setSelectedItem(item); setIsDetailsOpen(true); }}
                    onBorrow={() => handleBorrowClick(item)}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: "4rem" }}>
              <Pagination
                count={Math.ceil(filteredItems.length / itemsPerPage)}
                page={page}
                onChange={(e, v) => { setPage(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                sx={{
                  "& .MuiPaginationItem-root": { color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.1)" },
                  "& .Mui-selected": { backgroundColor: "#4ca38d !important", color: "#0a1410", fontWeight: 700 },
                  "& .MuiPaginationItem-root:hover": { backgroundColor: "rgba(76,163,141,0.1)", color: "white" },
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: "8rem" }}>
            <Box sx={{
              width: "5rem", height: "5rem", borderRadius: "50%",
              backgroundColor: "rgba(76,163,141,0.08)",
              border: "1px solid rgba(76,163,141,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: "1.5rem",
            }}>
              <LibraryBooksIcon sx={{ fontSize: "2rem", color: "rgba(76,163,141,0.5)" }} />
            </Box>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.4)", mb: "0.5rem" }}>
              Nincs találat
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.2)", fontSize: "0.9rem" }}>
              Próbáljon más keresési feltételeket
            </Typography>
            {(searchTerm || activeFilterCount > 0) && (
              <Button
                onClick={() => { setInputValue(""); setSearchTerm(""); resetFilters(); }}
                sx={{
                  mt: "1.5rem", color: "#4ca38d", textTransform: "none", fontWeight: 600,
                  "&:hover": { backgroundColor: "rgba(76,163,141,0.08)" },
                }}
              >
                Szűrők törlése
              </Button>
            )}
          </Box>
        )}

        <ItemDetails
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          item={selectedItem}
        />

        <Dialog
          open={borrowDialogOpen}
          onClose={() => setBorrowDialogOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#15221d",
              color: "white",
              border: "1px solid rgba(76,163,141,0.2)",
              borderRadius: "1rem",
            },
          }}
        >
          <DialogTitle sx={{ color: "white", fontWeight: 700, fontFamily: "serif" }}>
            Kölcsönzés megerősítése
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#9ca3af" }}>
              Biztosan ki szeretnéd kölcsönözni a következő tételt:{" "}
              <Box component="span" sx={{ color: "#4ca38d", fontWeight: 700 }}>
                {itemToBorrow?.title}
              </Box>
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: "1rem" }}>
            <Button
              onClick={() => setBorrowDialogOpen(false)}
              sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
            >
              Mégse
            </Button>
            <Button
              onClick={confirmBorrow}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #4ca38d 0%, #3d8270 100%)",
                color: "#0a1410", fontWeight: 700,
                textTransform: "none", borderRadius: "0.6rem",
                "&:hover": { background: "linear-gradient(135deg, #5ab89f 0%, #4a9a85 100%)" },
              }}
            >
              Igen, kölcsönzöm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%", borderRadius: "0.75rem" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Catalog;