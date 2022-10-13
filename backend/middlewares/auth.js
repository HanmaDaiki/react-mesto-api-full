require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthorizationErr = require('../errors/AuthorizationErr');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

  if (!token) {
    throw new AuthorizationErr('Неправильные почта или пароль');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return next(new AuthorizationErr('Неправильные почта или пароль'));
  }

  req.user = payload;

  return next();
};
