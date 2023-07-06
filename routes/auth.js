const express = require('express');
const { User, joiAuthSchema } = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const validate = require('../middleware/validate');

router.post('/', validate(joiAuthSchema), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid credentials');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid credentials');

  const token = user.genAuthToken();
  res.status(200).send(token);
});

module.exports = router;
