const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const SECRET = 'nawa-secret-key';

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Middleware to verify token
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Register
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: 'All fields are required' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, email, hashed, role);
    res.json({ message: 'Account created', userId: result.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ error: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Wrong password' });
  const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, SECRET);
  res.json({ token, name: user.name, role: user.role });
});

// Submit quiz result
app.post('/results', authenticate, (req, res) => {
  const { experiment, score, total } = req.body;
  const date = new Date().toISOString();
  db.prepare('INSERT INTO results (student_id, student_name, experiment, score, total, date) VALUES (?, ?, ?, ?, ?, ?)')
    .run(req.user.id, req.user.name, experiment, score, total, date);
  res.json({ message: 'Result saved' });
});

// Get all results (teacher only)
app.get('/dashboard', authenticate, (req, res) => {
  if (req.user.role !== 'teacher')
    return res.status(403).json({ error: 'Teachers only' });
  const results = db.prepare('SELECT * FROM results ORDER BY date DESC').all();
  res.json(results);
});

// Get own results (student)
app.get('/my-results', authenticate, (req, res) => {
  const results = db.prepare('SELECT * FROM results WHERE student_id = ? ORDER BY date DESC').all(req.user.id);
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Nawa backend running on port ${PORT}`));
