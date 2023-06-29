const router = require('express').Router();
const { Todo } = require('../models/Todo');

// get all the unfinished items from a todo
router.get('/', async (req, res) => {
  // find todo
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('todo not found');
  // get all the unfinished items
  const unfinishedItems = todo.unfinishedItems;
  res.status(200).send(unfinishedItems);
});

// add items to unfinished array
router.post('/', async (req, res) => {
  let items = req.body.items;
  // use space to add multiple items
  items = items.trim().split(' ');
  // find todo
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('todo not found');
  // add items to todo
  todo.unfinishedItems.push(...items);
  await todo.save();
  res.status(200).send(todo);
});

// update an item in unfinished
router.put('/', async (req, res) => {
  // find todo
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('todo not found');
  // find item
  const indexOfItem = todo.unfinishedItems.indexOf(req.body.item);
  if (indexOfItem === -1) return res.status(404).send('item does not exist');
  // replace item with the new item
  todo.unfinishedItems.splice(indexOfItem, 1, req.body.newItem);
  await todo.save();
  res.status(200).send(todo);
});

// delete an item from unfinished
router.delete('/:item', async (req, res) => {
  // find todo
  let todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('todo not found');
  // find item
  const indexOfItem = todo.unfinishedItems.indexOf(req.params.item);
  if (indexOfItem === -1) return res.status(404).send('item does not exist');
  // delete item
  todo.unfinishedItems.splice(indexOfItem, 1);
  todo = await todo.save();
  res.status(200).send(todo);
});

module.exports = router;
