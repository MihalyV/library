import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Box } from '@mui/material';
import CatalogPage from './pages/CatalogPage';
import SearchPage from './pages/SearchPage';
import Auth from './components/auth/Auth';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/katalogus" element={<CatalogPage />} />
            <Route path="/kereses" element={<SearchPage />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;