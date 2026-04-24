import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Select,
  Pagination,
  InputAdornment,
  IconButton,
  Stack,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ItemCard from "../../ui/ItemCard";
import ItemDetails from "../../ui/ItemDetails";
import { api } from "../../services/api";

function Catalog() {
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 6;
  const [userLoans, setUserLoans] = React.useState([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const [borrowDialogOpen, setBorrowDialogOpen] = React.useState(false);
  const [itemToBorrow, setItemToBorrow] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [type, setType] = React.useState("Összes típus");
  const [status, setStatus] = React.useState("Minden státusz");
  const [genre, setGenre] = React.useState("Összes");

  const handleOpenDetails = (item) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleBorrowClick = (item) => {
    const token = localStorage.getItem("library_token");
    if (!token) {
      navigate("/bejelentkezes", {
        state: { message: "A kölcsönzés funkcióhoz bejelentkezés szükséges!" },
      });
      return;
    }
    setItemToBorrow(item);
    setBorrowDialogOpen(true);
  };

  const confirmBorrow = async () => {
    if (itemToBorrow) {
      try {
        await api.borrowItem(itemToBorrow.itemId);
        setSnackbar({
          open: true,
          message: "Sikeres kölcsönzés!",
          severity: "success",
        });
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

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const itemsData = await api.getItems();
        setItems(itemsData);

        const token = localStorage.getItem("library_token");
        if (token) {
          try {
            const loansData = await api.getMyLoans();
            setUserLoans(Array.isArray(loansData) ? loansData : []);
          } catch (loanError) {
            console.error("Kölcsönzések betöltése sikertelen:", loanError);
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
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      type === "Összes típus" || item.itemType?.typeName === type;
    const matchesStatus = status === "Minden státusz" || item.status === status;
    const matchesGenre = genre === "Összes" || item.genre === genre;
    return matchesSearch && matchesType && matchesStatus && matchesGenre;
  });

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box
      sx={{
        backgroundColor: "#0a1410",
        minHeight: "100vh",
        py: "4rem",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, mb: "3rem", fontFamily: "serif" }}
        >
          Katalógus
        </Typography>

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            p: "1.5rem",
            borderRadius: "1.25rem",
            mb: "3rem",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: showFilters ? "2rem" : 0 }}
          >
            <TextField
              fullWidth
              placeholder="Cím, szerző vagy ISBN alapján keresés..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "0.75rem",
                "& .MuiOutlinedInput-root": {
                  height: "3.5rem",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "#4ca38d" },
                },
                input: { color: "white" },
              }}
            />

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: "#4ca38d",
                color: "#0a1410",
                fontWeight: "bold",
                px: "2rem",
                borderRadius: "0.75rem",
                textTransform: "none",
                height: "3.5rem",
                "&:hover": { backgroundColor: "#3d8270" },
              }}
            >
              Keresés
            </Button>

            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                backgroundColor: showFilters
                  ? "rgba(76, 163, 141, 0.2)"
                  : "rgba(255,255,255,0.05)",
                color: "white",
                borderRadius: "0.75rem",
                width: "3.5rem",
                height: "3.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Stack>

          {showFilters && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "2rem",
                pt: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    mb: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Típus
                </Typography>
                <Select
                  fullWidth
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    color: "white",
                    borderRadius: "0.75rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "& .MuiSvgIcon-root": { color: "white" },
                  }}
                >
                  <MenuItem value="Összes típus">Összes típus</MenuItem>
                  <MenuItem value="Könyv">Könyv</MenuItem>
                  <MenuItem value="DVD">DVD</MenuItem>
                  <MenuItem value="Folyóirat">Folyóirat</MenuItem>
                  <MenuItem value="Egyéb">Egyéb</MenuItem>
                </Select>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    mb: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Státusz
                </Typography>
                <Select
                  fullWidth
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    color: "white",
                    borderRadius: "0.75rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "& .MuiSvgIcon-root": { color: "white" },
                  }}
                >
                  <MenuItem value="Minden státusz">Minden státusz</MenuItem>
                  <MenuItem value="Elérhető">Elérhető</MenuItem>
                  <MenuItem value="Kikölcsönözve">Kikölcsönözve</MenuItem>
                </Select>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    mb: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Műfaj
                </Typography>
                <Select
                  fullWidth
                  value={genre}
                  onChange={(e) => {
                    setGenre(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    color: "white",
                    borderRadius: "0.75rem",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                    "& .MuiSvgIcon-root": { color: "white" },
                  }}
                >
                  <MenuItem value="Összes">Összes</MenuItem>
                  <MenuItem value="Regény">Regény</MenuItem>
                  <MenuItem value="Sci-fi">Sci-fi</MenuItem>
                  <MenuItem value="Ismeretterjesztő">Ismeretterjesztő</MenuItem>
                </Select>
              </Box>
            </Box>
          )}
        </Box>

        {loading ? (
          <CircularProgress
            sx={{ display: "block", mx: "auto", color: "#4ca38d" }}
          />
        ) : (
          <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              {currentItems.map((item) => (
                <Box key={item.itemId} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 1rem)' } }}>
                  <ItemCard 
                    item={item} 
                    userLoans={userLoans}
                    onOpenDetails={() => handleOpenDetails(item)} 
                    onBorrow={() => handleBorrowClick(item)}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: "4rem" }}>
              <Pagination
                count={Math.ceil(filteredItems.length / itemsPerPage)}
                page={page}
                onChange={(e, v) => setPage(v)}
                sx={{
                  "& .MuiPaginationItem-root": { color: "white" },
                  "& .Mui-selected": {
                    backgroundColor: "#4ca38d !important",
                    color: "#0a1410",
                  },
                }}
              />
            </Box>
          </>
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
              border: "1px solid rgba(76, 163, 141, 0.2)",
              borderRadius: "1rem",
            },
          }}
        >
          <DialogTitle
            sx={{ color: "white", fontWeight: 700, fontFamily: "serif" }}
          >
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
          <DialogActions sx={{ p: 2 }}>
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
                backgroundColor: "#4ca38d",
                color: "#0a1410",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "0.6rem",
                "&:hover": {
                  backgroundColor: "#3d8270",
                },
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
          <Alert
            severity={snackbar.severity}
            sx={{ width: "100%", borderRadius: "0.6rem" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Catalog;