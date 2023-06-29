const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 18, require: true },
  email: { type: String, min: 6, max: 50, require: true },
  password: { type: String, min: 8, max: 100, require: true },
  isAdmin: Boolean,
});

userSchema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PVT_KEY);
};

const userJoiSchema = {
  name: Joi.string().required().min(3).max(18),
  email: Joi.string().email().required().min(6).max(50),
  password: Joi.string().required().min(8).max(100),
  repeatPassword: Joi.ref('password'),
};

const User = mongoose.model('User', userSchema);

module.exports = { User, userJoiSchema };
