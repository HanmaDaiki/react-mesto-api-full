const Card = require('../models/card');
const ValidationErr = require('../errors/ValidationErr');
const NotFoundErr = require('../errors/NotFoundErr');
const CastErr = require('../errors/CastErr');
const AccessErr = require('../errors/AccessErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((error) => next(error));
};

module.exports.createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationErr('Некорректные данные!');
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const id = req.params.cardId;

  Card.findByIdAndDelete(id)
    .then((card) => {
      if (card === null) {
        throw new NotFoundErr('Карточка не существует!');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new AccessErr('Ошибка доступа к карточке');
      }

      return res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new CastErr('Некорректные данные карточки!');
      }
      next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after', new: true, runValidators: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundErr('Добавление лайка несуществующей карточки!');
      }

      return res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new CastErr('Добавление лайка с некорректным id для карточки!');
      }
      next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const id = req.params.cardId;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after', new: true, runValidators: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundErr('Добавление лайка несуществующей карточки!');
      }

      return res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new CastErr('Удаления лайка с некорректным id для карточки');
      }
      next(error);
    });
};
