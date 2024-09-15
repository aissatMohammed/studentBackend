const express = require('express');
const rout = express.Router();
const usermodel = require('../models/user.module');
rout.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  usermodel.register(username, email, password)
    .then((user) => {
      res.status(201).json({ user: user, msg: 'Registered successfully' });
    })
    .catch((err) => {
      console.error('Registration error:', err); // Log the error for debugging
      res.status(500).json({ msg: 'An error occurred while registering' }); // Generic error message
    });
});

rout.post('/login', (req, res, next) => {
  const {email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  usermodel.login(email, password)
    .then((token) => {
      res.status(201).json({ token: token});
    })
    .catch((err) => {
      console.error('Registration error:', err); // Log the error for debugging
      res.status(500).json({ msg: 'An error occurred while registering' }); // Generic error message
    });
});
module.exports = rout;
