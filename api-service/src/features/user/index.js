const userController = require('./user.controller');
const userRoute = require('./user.route');
const userService = require('./user.service');
const User = require('./user.model');

module.exports = {
  userController,
  userRoute,
  userService,
  User,
};
