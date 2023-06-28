const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/me', auth, admin, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).send(user);
});

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
    isAdmin: req.body.isAdmin,
  };
  user = new User(user);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    user = await user.save();
    const token = user.genAuthToken();

    user = _.pick(user, ['_id', 'name', 'email', 'phone']);
    res.header('x-auth-token', token).status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
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
