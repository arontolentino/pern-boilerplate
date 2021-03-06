const Joi = require('joi');
const { password } = require('../../utils/customValidation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    role: Joi.string(),
    isEmailVerified: Joi.boolean(),
    sortBy: Joi.string(),
    sortDirection: Joi.string(),
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).max(100).required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: 'uuidv4',
    }),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string()
      .guid({
        version: 'uuidv4',
      })
      .required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().guid({
      version: 'uuidv4',
    }),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
