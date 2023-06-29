const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, joiSchema } = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateBody = require('../middleware/validateBody');
const validateID = require('../middleware/validateID');

const router = express.Router();

// get details
router.get('/me', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all the users
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get a user by id
router.get('/:id', validateID, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('user not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// create a new user
router.post('/', validateBody(joiSchema), async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    // generate a new token
    const token = user.genAuthToken();
    user = _.pick(user, ['_id', 'name', 'email', 'phone']);
    // send user in response
    res.header('x-auth-token', token).status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update a user
router.put('/:id', validateBody(joiSchema), validateID, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('user not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete a user
router.delete('/:id', validateID, async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('user not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
