const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('objection');
const knex = require('../../config/knex');
const ApiError = require('../../utils/ApiError');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'userId';
  }

  static get relationMappings() {
    const { Token } = require('../token');

    return {
      tokens: {
        relation: Model.HasManyRelation,
        modelClass: Token,
        join: {
          from: 'users.userId',
          to: 'tokens.userId',
        },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  /**
   * Check if email is taken
   * @param {string} email - The user's email
   * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
   * @returns {Promise<boolean>}
   */
  async isEmailTaken(email, excludeUserId) {
    let user;

    if (excludeUserId) {
      user = await this.constructor.query().findOne({ email }).whereNot('userId', excludeUserId);
    } else {
      user = await this.constructor.query().findOne({ email });
    }

    return !!user;
  }

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password) {
    return await bcrypt.compare(password, this.password);
  }

  async getSignedJwtToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async $beforeInsert(queryContext) {
    // Check if email exists
    if (await this.isEmailTaken(this.email)) {
      throw new ApiError(400, 'Email already taken.');
    }

    // Check if password is empty
    if (!this.password) {
      throw new ApiError(400, 'Please enter a password');
    }

    this.password = await this.encryptPassword(this.password);
  }

  async $beforeUpdate(opt, queryContext) {
    if (this.email && (await this.isEmailTaken(this.email))) {
      throw new ApiError(400, 'Email already taken.');
    }

    // Check if password is being updated
    if (this.password) {
      this.password = await this.encryptPassword(this.password);
    }
  }
}

module.exports = User;
