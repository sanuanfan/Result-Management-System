<<<<<<< Updated upstream
=======
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/User'); // Import your user model
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Not connected to database', err));

app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  console.log('Login data:', { userName, password });

  try {
    const user = await User.findOne({ username: userName });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords (if passwords are hashed, you should use bcrypt.compare here)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Send a success response
    res.json({ message: 'success' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server listening on port 5000'));
>>>>>>> Stashed changes
