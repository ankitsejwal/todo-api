const express = require('express');
const config = require('config');
const todos = require('./routes/todos');

const app = express();

app.use(express.json());

app.use('/api/todos', todos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
