const db = require('../db');
const db = require('../db1'); 
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are present
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const checkUserSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserSql, [email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Hashing error:', err);
        return res.status(500).json({ message: 'Password hashing failed' });
      }

      // Insert new user
      const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertSql, [name, email, hash], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Failed to register user' });
        }

        return res.status(201).json({ message: 'Registration successful' });
      });
    });
  });
};
