const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/todos');

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

router.get('/:id', async (req, res) => {});

router.post('/', async (req, res) => {});

router.put('/:id', async (req, res) => {});
router.delete('/:id', async (req, res) => {});

module.exports = router;
