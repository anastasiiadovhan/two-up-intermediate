const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'my-secret-pw',
  database: 'twoupgame'
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
});

module.exports = connection;
