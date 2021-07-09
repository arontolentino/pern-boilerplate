const { tokenTypes } = require('../config/tokens');

exports.up = async (knex) => {
  return await knex.schema.createTable('tokens', (table) => {
    table.increments('tokenId').primary();
    table.uuid('userId').notNullable();
    table.string('token').notNullable();
    table
      .enu('type', ['refresh', 'resetPassword', 'verifyEmail'])
      .notNullable();
    table.date('expires').notNullable();
    table.boolean('blacklisted').notNullable().defaultTo(false);
    table.timestamps(true, true);

    table
      .foreign('userId')
      .references('userId')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('tokens');
};
