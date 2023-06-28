const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// get all the finished items from a todo
router.get('/:todoID', async (req, res) => {
  const todoID = req.params.todoID;
  const todo = await Todo.findById(todoID);

  const finishedItems = todo.finishedItems;
  res.status(200).send(finishedItems);
});

// add items to finished array
router.post('/:todoID', async (req, res) => {
  const todoID = req.params.todoID;
  let item = req.body.item;

  let todo = await Todo.findById(todoID);
  const indexOfItem = todo.unfinishedItems.indexOf(item);
  if (indexOfItem === -1) return res.status(404).send('item not found');
  todo.unfinishedItems.splice(indexOfItem, 1);
  todo.finishedItems.push(item);
  todo = await todo.save();
  res.send(todo);
});

// delete an item from finished
router.delete('/:todoID/:item', async (req, res) => {
  const todoID = req.params.todoID;
  const item = req.params.item;

  let todo = await Todo.findById(todoID);
  const indexOfItem = todo.finishedItems.indexOf(item);
  todo.finishedItems.splice(indexOfItem, 1);
  todo = await todo.save();
  res.status(200).send(todo);
});

module.exports = router;
