const express = require('express');
const todos = require('./routes/todos');

const app = express();

app.use('/api/todos', todos);

app.get('/', (req, res) => {
  const env1 = app.get('env');
  res.send(env1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('port:', port));
