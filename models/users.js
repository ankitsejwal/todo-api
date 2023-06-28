const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 18, require: true },
  email: { type: String, min: 8, max: 50, require: true },
  password: { type: String, min: 8, require: true },
});

userSchema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PVT_KEY);
};

module.exports = mongoose.model('User', userSchema);
