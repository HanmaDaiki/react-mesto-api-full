const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getMeInfoUser,
} = require('../controllers/users');
const validateUrl = require('../utils/validateUrl');

router.get('/', getUsers);
router.get('/me', getMeInfoUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl),
  }),
}), updateUserAvatar);

module.exports = router;
