const express = require('express');
const config = require('config');
const todos = require('./routes/todos');

const app = express();

app.use('/api/todos', todos);

const env = app.get('env');
console.log(env);

console.log(config.get('mongodb.password'));

app.get('/', (req, res) => {
  res.send('home route');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
