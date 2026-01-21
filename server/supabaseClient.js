// server/supabaseClient.js
// This file initializes the Supabase client for database and auth operations.

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables. Check .env file.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

module.exports = supabase;

// Real World Context:
// This pattern keeps your Supabase connection logic separate and reusable. 
// In a professional codebase, you would import this client wherever you need to interact with Supabase (auth, database, storage, etc.).