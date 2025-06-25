// db1.js
const mysql = require('mysql2');
require('dotenv').config();

const db1 = mysql.createPool({
  host: process.env.BOOKLIST_DB_HOST || 'localhost',
  user: process.env.BOOKLIST_DB_USER || 'root',
  password: process.env.BOOKLIST_DB_PASSWORD || '',
  database: process.env.BOOKLIST_DB_NAME || 'deepthi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db1.getConnection((err, connection) => {
  if (err) {
    console.error(' Booklist DB Connection Failed:', err.message);
  } else {
    console.log(' Connected to Booklist DB (deepthi)');
    connection.release();
  }
});

module.exports = db1;
