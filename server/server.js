const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

//  Databases
const authDB = require('./db');      // booknest - for login/register
const booklistDB = require('./db1'); // deepthi - for book list
const cartDB = require('./db2');     // cartdb - for cart

app.use(cors());
app.use(bodyParser.json());

// ------------------ Register Route ------------------
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  authDB.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(' Register Error:', err.message);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.json({ message: 'Registration successful' });
  });
});

// ------------------ Login Route ------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  authDB.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(' Login SQL Error:', err.message);
      return res.status(500).json({ message: 'Server error: ' + err.message });
    }

    if (result.length > 0) {
      return res.status(200).json({ message: 'Login successful', user: result[0] });
    } else {
      return res.status(401).json({ message: 'login failed! Try again' });
    }
  });
});

// ------------------ Book Fetch Route ------------------
app.get('/api/books', (req, res) => {
  booklistDB.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error(' Query Error:', err.message);
      return res.status(500).json({ message: 'Error fetching books' });
    }
    res.json(results);
  });
});

// ------------------ Cart Routes ------------------

//  Get cart items by user ID
app.get('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;
  cartDB.query('SELECT * FROM cart WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch cart items', error: err });
    res.json(results);
  });
});

//  Add item to cart
app.post('/api/cart/add', (req, res) => {
  const { user_id, book_id, quantity } = req.body;
  const query = 'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, ?)';
  cartDB.query(query, [user_id, book_id, quantity], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add to cart', error: err });
    res.json({ message: 'Item added to cart' });
  });
});

//  Remove item from cart by cart ID
app.delete('/api/cart/:cartId', (req, res) => {
  const { cartId } = req.params;
  cartDB.query('DELETE FROM cart WHERE id = ?', [cartId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to remove from cart', error: err });
    res.json({ message: 'Item removed from cart' });
  });
});

// ------------------ Server ------------------
app.listen(PORT, () => {
  console.log(` Node.js API server running on http://localhost:${PORT}`);
});
