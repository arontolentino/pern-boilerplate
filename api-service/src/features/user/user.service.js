const httpStatus = require('http-status');
const User = require('./user.model');
const ApiError = require('../../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (reqBody) => {
  const user = await User.query().insert(reqBody);

  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (reqQuery) => {
  const users = await User.query()
    .modify(function (queryBuilder) {
      if (reqQuery.name) {
        queryBuilder.where('name', reqQuery.name);
      }

      if (reqQuery.role) {
        queryBuilder.where('role', reqQuery.role);
      }

      if (reqQuery.sortBy && reqQuery.sortDirection) {
        queryBuilder.orderBy(reqQuery.sortBy, reqQuery.sortDirection);
      }

      if (reqQuery.sortBy) {
        queryBuilder.orderBy(reqQuery.sortBy);
      }
    })
    .page(reqQuery.page - 1, reqQuery.pageSize);

  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.query().findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.query().findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await user.$query().patch(updateBody).returning('*');

  return updatedUser;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const deletedUser = await user.$query().delete().returning('*');

  return deletedUser;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
