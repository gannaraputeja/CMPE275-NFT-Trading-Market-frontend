/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import './App.css';
import {
  useState, useEffect, createContext,
} from 'react';
import { gapi } from 'gapi-script';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import SystemDashboard from './pages/Dashboard/SystemDashboard';
import NftCollection from './pages/NftCollection/NftCollection';
import Cart from './pages/Cart/Cart';
import PersonalStats from './pages/PersonalStats/PersonalStats';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NftSale from './pages/NftSale/NftSale';
import CLIENT_ID from './config';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import UserWallet from './pages/UserWallet/UserWallet';

const Context = createContext(null);

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null
  );
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        CLIENT_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    console.log('success:', res);
    setUserObj(res);
    localStorage.setItem('access-token', res.tokenObj.access_token);
    setToken(res.tokenObj.access_token);
    useNavigate('/');
  };
  const onFailure = (err) => {
    console.log('failed:', err);
    setUserObj(null);
    setToken(null);
    useNavigate('/');
  };

  const logoutUser = () => {
    console.log(`Before logout -->${token}`);
    setToken(null);
    localStorage.removeItem('access-token');
    // useNavigate('/');
    console.log(`After logout -->${token}`);
  };

  if (token === null) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login clientId={CLIENT_ID} onSuccess={onSuccess} onFailure={onFailure} />} />
        </Routes>
      </div>
    );
  }

  return (
    <Context.Provider value={setToken}>
      <div>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="/" element={<Navbar setToken={setToken} userObj={userObj} logoutUser={logoutUser} />}>
            <Route index element={<Home />} />
            <Route path="/collection" element={<NftCollection />} />
            <Route path="/nftsale" element={<NftSale />} />
            <Route path="/personalstats" element={<PersonalStats />} />
            <Route path="/dashboard" element={<SystemDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wallet" element={<UserWallet />} />
          </Route>
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
