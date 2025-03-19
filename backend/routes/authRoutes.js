const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User created', role });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


module.exports = router;