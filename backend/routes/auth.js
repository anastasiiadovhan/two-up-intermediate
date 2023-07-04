const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my-secret-key';

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password', err);
      res.status(500).json({ message: 'Server error' });
      return;
    }

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(sql, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error storing user in database', err);
        if(err.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ message: 'User already exists' });
        } else {
          res.status(500).json({ message: 'Server error' });
        }
        return;
      }
      res.status(201).json({ message: 'User registered' });
    });
  });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

   // Check if username and password are not empty
   if (!username || !password) {
    res.status(400).json({message: 'Username and password must not be blank'});
    return;
  }

  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err || results.length === 0) {
      // If there's an error with the query or if the user doesn't exist
      console.error('Error fetching user from database', err);
      res.status(500).json({message: 'Server error', error: err ? err.toString() : 'User not found'});
      return;
    }

    const user = results[0];

    // If the password is wrong
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        console.error('Error comparing passwords', err);
        res.status(401).json({message: 'Invalid credentials', error: err ? err.toString() : ''});
        return;
      }

      // Passwords match - generate a JWT and send it back to the user
      const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1h'});
      res.status(200).json({message: 'Login successful', token: token, userId: user.id});
    });
  });
});

module.exports = router;

