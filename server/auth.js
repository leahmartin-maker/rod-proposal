// server/auth.js
// Handles authentication routes using Supabase Auth

const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');

// POST /register
// Registers a new user with email and password
router.post('/register', async (req, res) => {
  const { email, password, name, role_id } = req.body;
  if (!email || !password || !name || !role_id) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role_id },
      email_confirm: true
    });
    if (error) throw error;
    // Optionally, insert into your users table for extra fields
    // ...
    res.status(201).json({ message: 'User registered successfully.', user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /login
// Logs in a user and returns a session
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password.' });
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.json({ message: 'Login successful.', session: data.session, user: data.user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;

// Real World Context:
// This file keeps authentication logic clean and separate. It validates input, uses Supabase for secure auth, and returns clear errors. In a professional app, you’d also add rate limiting, logging, and possibly email verification flows.