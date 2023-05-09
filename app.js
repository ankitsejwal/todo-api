const express = require('express');
const todos = require('./routes/todos');

const app = express();

app.use('/api/todos', todos);

app.get('/', (req, res) => {
  res.send('hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
