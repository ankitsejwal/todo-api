const express = require('express');
const Joi = require('joi');
const Todo = require('../models/Todo');

const router = express.Router();

// get all the todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

// get a todo by name
router.get('/:name', async (req, res) => {
  let todo = await Todo.findOne({ name: req.params.name });
  // if name is incorrect
  if (!todo) return res.status(500).send('incorrect name');
  // else
  res.status(200).send(todo);
});

// create a new todo
router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    unfinishedItems: Joi.array().items(Joi.string().min(3).max(15)),
    finishedItems: Joi.array().items(Joi.string().min(3).max(15)),
  });

  let todo = {
    name: req.body.name,
    unfinishedItems: req.body.unfinishedItems,
    finishedItems: req.body.finishedItems,
  };

  const { value, error } = schema.validate(todo);
  if (error) return res.status(500).send(error.details[0].message);
  todo = await new Todo(value);
  todo = await todo.save();
  res.status(200).send(todo);
});

// get a single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('ID not found');
  }
});

// update an existing todo
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let todo = {
    name: req.body.name,
    unfinishedItems: req.body.unfinishedItems,
    finishedItems: req.body.finishedItems,
  };
  todo = await Todo.findByIdAndUpdate(id, todo, { new: true });
  res.status(200).send(todo);
});

// delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('ID not found');
  }
});

module.exports = router;
