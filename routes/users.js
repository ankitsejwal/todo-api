const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.find();
  res.status(200).send(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
});

router.post('/', async (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };
  user = new User(user);
  user = await user.save();
  res.status(200).send(user);
});

router.put('/:id', async (req, res) => {
  let user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;

  user = await user.save();
  res.status(200).send(user);
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(404).send('user not found');
  }
});

module.exports = router;
