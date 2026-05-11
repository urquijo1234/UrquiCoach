const express = require('express');
const cors = require('cors');
const planRoutes = require('./routes/planRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/plan', planRoutes);

module.exports = app;
