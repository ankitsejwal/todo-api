const express = require('express');
const Todo = require('../models/todos');

const router = express.Router();

// get all the todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

// get a single todo
// router.get('/:id', async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);
//     res.status(200).send(todo);
//   } catch (err) {
//     console.log(err.message);
//     res.status(404).send('ID not found');
//   }
// });

// get a todo by name
router.get('/:name', async (req, res) => {
  let todo = await Todo.findOne({ name: req.params.name });
  // if name is incorrect
  if (!todo) return res.status(500).send('Incorrect name');
  // else
  res.status(200).send(todo);
});

// create a new todo
router.post('/', async (req, res) => {
  let todo = {
    name: req.body.name,
    unfinishedItems: req.body.unfinishedItems,
    finishedItems: req.body.finishedItems,
  };

  todo = await new Todo(todo);
  todo = await todo.save();
  res.status(200).send(todo);
});

// add items to unfinished array
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let items = req.body.items;
  items = items.trim().split(' ');
  console.log(items);

  let todo = await Todo.findById(id);
  todo.unfinishedItems.push(...items);
  todo = await todo.save();
  res.send(todo);
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
