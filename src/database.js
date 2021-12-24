const configDB = require('./config/db')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: configDB.db_host,
        port: 3306,
        user: configDB.db_user,
        password: configDB.db_password,
        database: configDB.db_name
    }
});

module.exports = knex