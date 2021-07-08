const User = require('./user.model');
const ApiError = require('../../utils/ApiError');

const createUser = async (reqBody) => {
  const { name, email, password } = reqBody;

  // console.log(User);

  // Create user
  const user = await User.query().insert({
    name,
    email,
    password,
  });

  return user;
};

const getUserByEmail = async (email) => {
  return User.query().findOne({ email });
};

module.exports = {
  createUser,
  getUserByEmail,
};
