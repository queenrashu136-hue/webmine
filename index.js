const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Avoid memory leak warnings
require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(__dirname));

// Routes (wrap in try-catch to avoid crash)
try {
  app.use('/server', require('./qr'));
  app.use('/code', require('./pair'));
} catch (e) {
  console.error("Route load error:", e.message);
}

// Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/pair', (req, res) => {
  res.sendFile(path.join(__dirname, 'pair.html'));
});

app.get('/qr', (req, res) => {
  res.sendFile(path.join(__dirname, 'qr.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;