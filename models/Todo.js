const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

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

const Todo = mongoose.model('Todo', todoSchema);

const bodySchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  unfinishedItems: Joi.array().items(Joi.string().min(3).max(15)),
  finishedItems: Joi.array().items(Joi.string().min(3).max(15)),
});

module.exports = { Todo, joiSchema };
