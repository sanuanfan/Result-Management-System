// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/User'); 
const attendanceRoutes = require('./Routes/AttendanceRoute');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Adjust the origin for production to specific URLs
app.use(express.json());

// Routes
app.use('/api/attendances', attendanceRoutes);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login data:', { username, password });

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Incorrect password');
      return res.status(400).json({ message: 'Incorrect password' });
    }

    console.log('Login successful');
    res.json({ message: 'success' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
