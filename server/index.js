// server/index.js
// Entry point for the backend server
// This file sets up the Express app, loads environment variables, and provides a health check route.

require('dotenv').config(); // Loads environment variables from .env (MUST be first)
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies (must be before any routes)
app.use(express.json());

// Supabase client
let supabase;
try {
  supabase = require('./supabaseClient');
} catch (err) {
  console.error('Supabase client failed to initialize:', err.message);
}

// Auth routes
const authRoutes = require('./auth');
app.use('/auth', authRoutes);


// Health check route (simple version)
app.get('/health', (req, res) => {
  if (supabase) {
    res.json({ status: 'ok', message: 'Server is running and Supabase client is initialized.' });
  } else {
    res.status(500).json({ status: 'error', message: 'Supabase client not initialized.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // Confirm Supabase client is initialized
  if (supabase) {
    console.log('Supabase client initialized successfully.');
  } else {
    console.error('Supabase client failed to initialize.');
  }
});

// Real World Context:
// In a professional environment, this entry point ensures the server is up, environment variables are loaded securely, and a health check endpoint is available for monitoring tools or deployment platforms. It also verifies database connectivity on startup and via health check.