const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// PORT setup (Rende)
const PORT = process.env.PORT || 8000;

// Path variable
const __path = process.cwd();

// Load your routes
const server = require('./qr');
const code = require('./pair');

// Avoid memory leak warnings
require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/server', server);
app.use('/code', code);

app.get('/pair', (req, res) => {
  res.sendFile(path.join(__path, 'pair.html'));
});

app.get('/qr', (req, res) => {
  res.sendFile(path.join(__path, 'qr.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__path, 'main.html'));
});

// Start server (Render detect වෙන්න 0.0.0.0 bind එක)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ QUEEN-RASHU-MD Server Running
🌐 URL: http://localhost:${PORT}
⭐ Don't forget to star QUEEN-RASHU-MD repo!
━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

module.exports = app;
