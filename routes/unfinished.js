const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// get all the unfinished items from a todo
router.get('/:todoID', async (req, res) => {
  const todoID = req.params.todoID;
  const todo = await Todo.findById(todoID);

  const unfinishedItems = todo.unfinishedItems;
  res.status(200).send(unfinishedItems);
});

// add items to unfinished array
router.post('/:todoID', async (req, res) => {
  const todoID = req.params.todoID;
  let items = req.body.items;
  // use space to add multiple items
  items = items.trim().split(' ');

  let todo = await Todo.findById(todoID);
  todo.unfinishedItems.push(...items);
  todo = await todo.save();
  res.send(todo);
});

// update an item in unfinished
router.put('/:todoID/:item/:newVal', async (req, res) => {
  const todoID = req.params.todoID;
  const item = req.params.item;
  const newVal = req.params.newVal;

  let todo = await Todo.findById(todoID);
  const indexOfItem = todo.unfinishedItems.indexOf(item);
  if (indexOfItem === -1) return res.status(500).send('item does not exist');
  todo.unfinishedItems.splice(indexOfItem, 1, newVal);
  todo = await todo.save();
  res.status(200).send(todo);
});

// delete an item from unfinished
router.delete('/:todoID/:item', async (req, res) => {
  const todoID = req.params.todoID;
  const item = req.params.item;

  let todo = await Todo.findById(todoID);
  const indexOfItem = todo.unfinishedItems.indexOf(item);
  todo.unfinishedItems.splice(indexOfItem, 1);
  todo = await todo.save();
  res.status(200).send(todo);
});

module.exports = router;
