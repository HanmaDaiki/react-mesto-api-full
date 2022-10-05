require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ValidationErr = require('../errors/ValidationErr');
const NotFoundErr = require('../errors/NotFoundErr');
const CastErr = require('../errors/CastErr');
const ReapeatEmailErr = require('../errors/ReapeatEmailErr');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id.toString() }, 'super-strong-secret', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ email: user.email })
        .end();
    })
    .catch((error) => next(error));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.send({
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        }))
        .catch((error) => {
          if (error.name === 'ValidationError') {
            throw new ValidationErr('Некорректные данные для создания пользователя!');
          }

          if (error.code === 11000) {
            throw new ReapeatEmailErr('Почтовый адрес уже занят!');
          }
        })
        .catch((error) => {
          next(error);
        });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => next(error));
};

module.exports.getMeInfoUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => next(error));
};

module.exports.getUserById = (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundErr('Такого id пользователя не существует!');
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new CastErr('Некорректный id для получения пользователя!');
      }

      next(error);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { name, about }, { returnDocument: 'after', new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NotFoundErr('Несуществующий id пользователя!!');
      }

      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationErr('Некорректные данные');
      }
      if (error.name === 'CastError') {
        throw new NotFoundErr('Пользователь не найден!');
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate({ _id: userId }, { avatar }, { returnDocument: 'after', new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NotFoundErr('Несуществующий id пользователя!');
      }

      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationErr('Некорректные данные пользователя!');
      }
      if (error.name === 'CastError') {
        throw new NotFoundErr('Пользователь не найден!');
      }

      next(error);
    });
};
