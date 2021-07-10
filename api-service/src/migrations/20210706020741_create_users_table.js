exports.up = async (knex) => {
  return await knex.schema.createTable('users', (table) => {
    table.uuid('userId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.enu('role', ['user', 'admin']).notNullable().defaultTo('user');
    table.boolean('isEmailVerified').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('users');
};
