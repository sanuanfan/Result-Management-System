const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/User'); 
dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

mongoose.connect(process.env.URI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Not connected to database', err));
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login data:', { username, password });
  
    try {
      const user = await User.findOne({ username: username });
  
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
  
  

app.listen(5000, () => console.log('Server listening on port 5000'));

