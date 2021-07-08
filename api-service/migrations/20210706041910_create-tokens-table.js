const { tokenTypes } = require('../config/tokens');

exports.up = async (knex) => {
  return await knex.schema.createTable('tokens', (table) => {
    table.increments('tokenId').primary();
    table.uuid('userId').notNullable();
    table.string('token').notNullable();
    table
      .enu(
        'type',
        [
          tokenTypes.REFRESH,
          tokenTypes.RESET_PASSWORD,
          tokenTypes.VERIFY_EMAIL,
        ],
        { useNative: true, enumName: 'token_type' }
      )
      .notNullable();
    table.date('expires').notNullable();
    table.boolean('blacklisted').notNullable().defaultTo(false);
    table.timestamps();

    table.foreign('userId').references('userId').inTable('users');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('tokens');
};
