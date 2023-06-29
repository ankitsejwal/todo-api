const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// get all the unfinished items from a todo
router.get('/', async (req, res) => {
  const todoID = req.params.id;
  const todo = await Todo.findById(todoID);

  const unfinishedItems = todo.unfinishedItems;
  res.status(200).send(unfinishedItems);
});

// add items to unfinished array
router.post('/', async (req, res) => {
  const todoID = req.params.id;
  let items = req.body.items;
  // use space to add multiple items
  items = items.trim().split(' ');

  const todo = await Todo.findById(todoID);
  todo.unfinishedItems.push(...items);
  await todo.save();
  res.send(todo);
});

// update an item in unfinished
router.put('/:item/:newVal', async (req, res) => {
  const todoID = req.params.id;
  const item = req.params.item;
  const newVal = req.params.newVal;

  const todo = await Todo.findById(todoID);
  if (!todo) return res.status(404).send('todo not found');
  const indexOfItem = todo.unfinishedItems.indexOf(item);
  if (indexOfItem === -1) return res.status(500).send('item does not exist');
  todo.unfinishedItems.splice(indexOfItem, 1, newVal);
  await todo.save();
  res.status(200).send(todo);
});

// delete an item from unfinished
router.delete('/:item', async (req, res) => {
  const todoID = req.params.id;
  const item = req.params.item;

  let todo = await Todo.findById(todoID);
  const indexOfItem = todo.unfinishedItems.indexOf(item);
  todo.unfinishedItems.splice(indexOfItem, 1);
  todo = await todo.save();
  res.status(200).send(todo);
});

module.exports = router;
