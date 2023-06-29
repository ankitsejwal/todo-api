const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('todo-auth-token');
  if (!token) return res.status(401).send('No token provided');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PVT_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send(ex);
  }
}

module.exports = auth;
