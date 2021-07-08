exports.up = async (knex) => {
  return await knex.schema.createTable('users', (table) => {
    table.uuid('userId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name');
    table.string('email');
    table.string('password');
    table.timestamps();
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('users');
};
