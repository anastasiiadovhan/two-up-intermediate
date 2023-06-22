const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const { score, color } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      console.error('An error occurred while verifying JWT', err);
      res.status(500).send('Server error');
    } else {
      connection.query(
        `INSERT INTO game_sessions (user_id, score, preferred_color) VALUES (?, ?, ?)`,
        [decoded.userId, score, color],
        (err, results) => {
          if (err) {
            console.error('An error occurred while storing game session to DB', err);
            res.status(500).send('Server error');
          } else {
            res.status(200).send('Game session recorded');
          }
        }
      );
    }
  });
});

router.get('/leaderboard', (req, res) => {
  connection.query(
    'SELECT * FROM game_sessions ORDER BY score DESC LIMIT 10',
    (err, results) => {
      if (err) {
        console.error('An error occurred while retrieving high scores', err);
        res.status(500).send('Server error');
      } else {
        res.status(200).send(results);
      }
    }
  );
});

module.exports = router;
