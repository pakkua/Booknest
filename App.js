import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Orders from './components/Orders';
import Login from './components/Login';
import Signup from './components/Signup';
import BookList from './components/booklist';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser?.name || '';
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUsername(storedUser?.name || '');
  }, [location]);

  useEffect(() => {
    const protectedPaths = ['/cart', '/wishlist', '/orders'];
    if (!username && protectedPaths.includes(location.pathname)) {
      navigate('/login');
    }
  }, [username, location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername('');
    navigate('/login');
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        username={username}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login onLogin={(user) => setUsername(user.name)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<BookList />} />
        <Route path="*" element={<Login onLogin={(user) => setUsername(user.name)} />} />
      </Routes>
    </>
  );
}

export default App;
