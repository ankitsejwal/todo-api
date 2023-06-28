const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 18, require: true },
  email: { type: String, min: 8, max: 50, require: true },
  phone: { type: String, min: 8, max: 10, require: true },
  password: { type: String, min: 8, require: true },
  isAdmin: Boolean,
});

userSchema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('JWT_PVT_KEY'));
};

module.exports = mongoose.model('User', userSchema);
