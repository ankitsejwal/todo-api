const express = require('express');
const config = require('config');
const todos = require('./routes/todos');
const users = require('./routes/users');

const app = express();

app.use(express.json());

app.use('/api/todos', todos);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
