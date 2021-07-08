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

  async isEmailTaken(email) {
    const user = await this.constructor.query().findOne({ email });

    return !!user;
  }

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }

  async getSignedJwtToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async $beforeInsert(context) {
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
}

module.exports = User;
