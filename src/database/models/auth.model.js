const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: Number,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user']
  }
}, {
  timestamp: true,
});

const User = mongoose.model('User', schema);

module.exports = User;