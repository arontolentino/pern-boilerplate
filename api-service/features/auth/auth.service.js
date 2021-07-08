const ApiError = require('../../utils/ApiError');
const { userService } = require('../user');

const generateToken = async (user) => {
  // Create token
  const token = await user.getSignedJwtToken(user.userId);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // if (process.env.NODE_ENV === 'production') {
  //   options.secure = true;
  //   options.domain = '.betterseller.com';
  // }

  return { token, options };
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  return user;
};

module.exports = { generateToken, loginUserWithEmailAndPassword };
