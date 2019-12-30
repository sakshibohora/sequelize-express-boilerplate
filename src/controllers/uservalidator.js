const Joi = require('joi');

export const loginValidate = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

export const changePasswordValidate = {
  body: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

export const registerValidate = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};
