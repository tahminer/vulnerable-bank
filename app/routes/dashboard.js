const express = require('express');
const path = require('path');
const verifyToken = require('../middleware/auth');
const fs = require('fs');
const router = express.Router();

const csvPath = path.join(__dirname, '../../data/customers.csv');

// USER Dashboard

router.get('/user/info', verifyToken, (req, res) => {
  const username = req.user.username;

  const lines = fs.readFileSync(csvPath, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',');

  const userLine = lines.find((line, index) => {
    if (index === 0) return false;
    const cols = line.split(',');
    return cols[headers.indexOf('username')] === username;
  });

  if (!userLine) {
    return res.status(404).json({ message: 'User not found' });
  }

  const cols = userLine.split(',');

  const userData = {
    firstName: cols[headers.indexOf('firstName')],
    lastName: cols[headers.indexOf('lastName')],
    username: cols[headers.indexOf('username')],
    balance: cols[headers.indexOf('balance')]
  };
  res.json(userData);
});

// Admin-only: download real CSV data file
router.get('/upload/customers.csv', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }

  const filePath = path.join(__dirname, '../../data/customers.csv');
  res.download(filePath, 'customers.csv');
});

router.get('/admin/info', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }

  res.json({ message: `Welcome admin ${req.user.username}`, flag: "FLAG{admin_dashboard}" });
});


module.exports = router;
