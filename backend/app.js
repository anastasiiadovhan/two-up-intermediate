const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
// const gameSessionsRoutes = require('./routes/game-sessions');

app.use('/auth', authRoutes);
// app.use('/game-sessions', gameSessionsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
