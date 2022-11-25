/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import SystemDashboard from './pages/Dashboard/SystemDashboard';
import Listings from './pages/Listings/Listings';
import Cart from './pages/Cart/Cart';
import NftSale from './pages/NftSale/NftSale';
import PersonalStats from './pages/PersonalStats/PersonalStats';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/nftsale" element={<NftSale />} />
          <Route path="/personalstats" element={<PersonalStats />} />
          <Route path="/dashboard" element={<SystemDashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
