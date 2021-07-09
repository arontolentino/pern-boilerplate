const Knex = require('knex');

const knex = Knex({
  client: 'postgresql',
  connection: {
    host: 'postgres-service',
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
  },
});

module.exports = knex;
