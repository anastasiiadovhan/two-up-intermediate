const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Qwerty1509',
  database: 'twoupgame'
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB: ' + err.message);
    throw err;
  }
});

module.exports = connection;
