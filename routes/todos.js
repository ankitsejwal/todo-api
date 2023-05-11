const express = require('express');
const Todo = require('../models/todos');

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('ID not found');
  }
});

router.post('/', async (req, res) => {});

router.put('/:id', async (req, res) => {});

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
