import knex from 'knex';
import configDB from './config/db';

const conn = knex({
  client: 'mysql',
  connection: {
    host: configDB.db_host,
    port: 3306,
    user: configDB.db_user,
    password: configDB.db_password,
    database: configDB.db_name,
  },
});

export default conn;
