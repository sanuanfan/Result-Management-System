const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Assuming passwords are stored in plaintext (not recommended for production)
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
