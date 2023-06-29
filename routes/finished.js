const router = require('express').Router();
const { Todo } = require('../models/Todo');

// get all the unfinished items from a todo
router.get('/', async (req, res) => {
  // find todo
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('todo not found');
  // get all the unfinished items
  const finishedItems = todo.finishedItems;
  res.status(200).send(finishedItems);
});

// add items to finished array
router.post('/:todoID', async (req, res) => {
  let item = req.body.item;
  // find todo
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('todo not found');
  // find item
  const indexOfItem = todo.unfinishedItems.indexOf(item);
  if (indexOfItem === -1) return res.status(404).send('item not found');
  // move item from unfinished to finished
  todo.unfinishedItems.splice(indexOfItem, 1);
  todo.finishedItems.push(item);
  await todo.save();
  res.send(todo);
});

// delete an item from finished
router.delete('/:item', async (req, res) => {
  const item = req.params.item;
  // find todo
  const todo = await Todo.findById(todoID);
  if (!todo) return res.status(404).send('todo not found');
  // find item
  const indexOfItem = todo.finishedItems.indexOf(item);
  if (indexOfItem === -1) return res.status(404).send('item not found');
  // delete item
  todo.finishedItems.splice(indexOfItem, 1);
  await todo.save();
  res.status(200).send(todo);
});

module.exports = router;
