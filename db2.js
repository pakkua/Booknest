// db2.js - Cart database connection (MySQL)
const mysql = require('mysql2');
require('dotenv').config();

const db2 = mysql.createConnection({
  host: process.env.DB_CART_HOST || 'localhost',
  user: process.env.DB_CART_USER || 'root',
  password: process.env.DB_CART_PASSWORD || '',
  database: process.env.DB_CART_NAME || 'cartdb'
});

db2.connect((err) => {
  if (err) {
    console.error(' Failed to connect to cart database:', err.message);
  } else {
    console.log(' Connected to Cart DB (cartdb)');
  }
});

module.exports = db2;
