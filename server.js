const express = require('express');                  // Express framework import karte hain
const mongoose = require('mongoose');                // MongoDB se connect hone ke liye mongoose
const path = require('path');                        // File path handle karne ke liye built-in module
const dotenv = require('dotenv');                    // .env file se secrets fetch karne ke liye
const jwt = require('jsonwebtoken');                 // Token generate karne ke liye
const User = require('./model/Temp');               // User model import karte hain

dotenv.config();                                     // .env file ke variables load ho jaate hain

const app = express();                               // Express app create

app.use(express.urlencoded({ extended: true }));     // Form data handle karne ke liye middleware
app.use(express.static('public'));                   // Public folder serve karte hain (CSS/image)

mongoose.connect(process.env.MONGO_URI)              // MongoDB se connect kar rahe hain
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Home route → Login page serve karta hai
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Form submit hone par yah route trigger hota hai
app.post('/submit', async (req, res) => {
  const { name, age, city } = req.body;              // Form se aaye 3 values

  const user = new User({ name, age, city });        // New user object banaya
  await user.save();                                 // MongoDB me user save kiya

  // JWT token generate kiya (expiry 1 hour)
  const token = jwt.sign({ name, age, city }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log('✅ JWT Token:', token);               // Terminal me token print kar rahe hain

  // Success dashboard page dikha rahe hain
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Server ko start karte hain
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
