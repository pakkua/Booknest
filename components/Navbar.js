import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    } else {
      setUserName('');
    }
  }, [location]); // Listen to route changes

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName('');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">📚 BookNest</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
        {userName ? (
          <>
            <span className="username"> Hi, {userName}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
