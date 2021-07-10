const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { userService } = require('../user');
const { tokenService } = require('../token');
const { Token } = require('../token');
const { tokenTypes } = require('../../config/tokens');

const generateToken = async (user) => {
  // Create token
  const token = await user.getSignedJwtToken(user.userId);

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // if (process.env.NODE_ENV === 'production') {
  //   options.secure = true;
  //   options.domain = '.betterseller.com';
  // }

  return { token, options };
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.query()
    .delete()
    .where({
      token: refreshToken,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    })
    .returning('*');

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);

  const user = await userService.getUserById(refreshTokenDoc.userId);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }

  await refreshTokenDoc.$query().delete();
  return tokenService.generateAuthTokens(user);
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);

  const user = await userService.getUserById(resetPasswordTokenDoc.userId);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }

  await userService.updateUserById(user.userId, { password: newPassword });

  await Token.query().delete().where({
    userId: user.userId,
    type: tokenTypes.RESET_PASSWORD,
  });
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);

  const user = await userService.getUserById(verifyEmailTokenDoc.userId);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }

  await Token.query().delete().where({
    userId: user.userId,
    type: tokenTypes.VERIFY_EMAIL,
  });

  await userService.updateUserById(user.userId, { isEmailVerified: true });
};

module.exports = {
  generateToken,
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
