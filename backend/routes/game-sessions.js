const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../db');

const router = express.Router();

router.post('/save', (req, res) => {
  const userId = req.body.userId;
  const score = req.body.score;

  // insert new game session
  connection.query(
    'INSERT INTO game_sessions (user_id, score) VALUES (?, ?)',
    [userId, score],
    (err, results) => {
      if (err) {
        console.error('An error occurred while saving game session', err);
        res.status(500).send('Server error');
      } else {
        res.status(200).send({message: 'Game session saved successfully'});
      }
    }
  );
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

router.post('/update-color', (req, res) => {
  const userId = req.body.userId;
  const color = req.body.color;

  connection.query(
    'UPDATE users SET preferred_color = ? WHERE id = ?',
    [color, userId],
    (err, results) => {
      if (err) {
        console.error('An error occurred while updating color', err);
        res.status(500).send('Server error' + err.message);
      } else {
        res.status(200).send({message: 'Color updated successfully'});
      }
    }
  );
});

router.get('/get-color/:userId', (req, res) => {
  const userId = req.params.userId;

  connection.query(
    'SELECT preferred_color FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error('An error occurred while retrieving color', err);
        res.status(500).send('Server error');
      } else {
        res.status(200).json({color: results[0].preferred_color});
      }
    }
  );
});




module.exports = router;
