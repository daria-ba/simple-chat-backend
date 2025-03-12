require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.DB_URL;
const SUPABASE_KEY = process.env.DB_KEY;
const database = createClient(SUPABASE_URL, SUPABASE_KEY);


module.exports = { database };
