require('dotenv').config();
const jwt = require('jsonwebtoken');

const AuthorizationErr = require('../errors/AuthorizationErr');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthorizationErr('Неправильные почта или пароль');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthorizationErr('Неправильные почта или пароль');
  }

  req.user = payload;

  return next();
};
