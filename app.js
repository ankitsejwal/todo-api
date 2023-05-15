const express = require('express');
const config = require('config');
const todos = require('./routes/todos');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

if (!config.get('JWT_PVT_KEY')) {
  console.log('FATAL ERROR: JWT_PVT_KEY is not defined');
  process.exit(1);
}

app.use(express.json());

app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
