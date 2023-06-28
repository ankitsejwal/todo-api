const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 18,
    lowercase: true,
  },
  unfinishedItems: { type: [String], default: [] },
  finishedItems: { type: [String], default: [] },
});

module.exports = mongoose.model('Todo', todoSchema);
