const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  no_telp: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['guest', 'member', 'admin', 'panitia', 'keuangan'], 
    default: 'guest' 
  },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'member' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
