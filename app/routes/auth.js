const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const csvPath = path.join(__dirname, '../../data/customers.csv');

// Make sure headers are added once (optional)
if (!fs.existsSync(csvPath)) {
  fs.writeFileSync(csvPath, 'id,firstName,lastName,username,passwordHash,role,balance\n');
}

router.post('/register', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  // Check if user exists
  if (fs.existsSync(csvPath)) {
    const content = fs.readFileSync(csvPath, 'utf8');
    if (content.includes(username)) {
      return res.status(400).json({ message: 'User already exists' });
    }
  }

  const id = uuidv4();
  const passwordHash = await bcrypt.hash(password, 10);
  const role = 'user';
  const balance = 50;

  const newRow = `${id},${firstName},${lastName},${username},${passwordHash},${role},${balance}\n`;
  fs.appendFileSync(csvPath, newRow);

  res.json({ message: 'Registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!fs.existsSync(csvPath)) {
    return res.status(500).json({ message: 'User database not found' });
  }

  const lines = fs.readFileSync(csvPath, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',');

  const usernameIndex = headers.indexOf('username');
  const passwordHashIndex = headers.indexOf('passwordHash');
  const roleIndex = headers.indexOf('role');

  const userLine = lines.find((line, index) => {
    if (index === 0) return false; // skip header
    const cols = line.split(',');
    return cols[usernameIndex] === username;
  });

  if (!userLine) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const cols = userLine.split(',');
  const storedHash = cols[passwordHashIndex];
  const role = cols[roleIndex];

  const match = await bcrypt.compare(password, storedHash);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: username, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
