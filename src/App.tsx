import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import CategoryListings from './pages/CategoryListings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/category/:categoryId" element={<CategoryListings />} />
      </Routes>
    </Router>
  );
}
