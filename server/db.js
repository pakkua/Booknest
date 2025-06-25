const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booknest'  // <-- correct DB
});

db.connect((err) => {
  if (err) {
    console.error(' DB Connection Failed (Login/Register):', err.message);
  } else {
    console.log(' Connected to Login/Register DB (booknest)');
  }
});

module.exports = db;
