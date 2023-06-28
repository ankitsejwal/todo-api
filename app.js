require('dotenv').config();
const express = require('express');
const config = require('config');
const todos = require('./routes/todos');
const users = require('./routes/users');
const auth = require('./routes/auth');
const unfinished = require('./routes/unfinished');
const finished = require('./routes/finished');
const dbConnect = require('./dbConnect');
const checkSecrets = require('./checkSecrets');

checkSecrets();
dbConnect();
const app = express();

app.use(express.json());
app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/unfinished', unfinished);
app.use('/api/finished', finished);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
