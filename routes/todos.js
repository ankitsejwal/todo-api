const router = require('express').Router();
const { Todo, joiTodoSchema } = require('../models/Todo');
const validate = require('../middleware/validate');

// get all the todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get a single todo
router.get('/:id', validate('id'), async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('todo not found');
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// create a new todo
router.post('/', validate(joiTodoSchema), async (req, res) => {
  try {
    const todo = await new Todo(req.body);
    await todo.save();
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update an existing todo
router.put('/:id', validate(joiTodoSchema), validate('id'), async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).send('todo not found');
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete a todo
router.delete('/:id', validate('id'), async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.stats(404).send('todo not found');
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
