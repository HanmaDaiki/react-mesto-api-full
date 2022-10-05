const validator = require('validator');
const UrlValidatorErr = require('../errors/UrlValidatorErr');

const validateUrl = (value) => {
  const result = validator.isURL(value);

  if (result) {
    return value;
  }

  throw new UrlValidatorErr('Ошибка валидации URL!');
};

module.exports = validateUrl;
