const mongoose = require('mongoose');
const config = require('config');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 18,
    lowercase: true,
  },
  unfinishedItems: [String],
  finishedItems: [String],
});

module.exports = mongoose.model('Todo', todoSchema);
