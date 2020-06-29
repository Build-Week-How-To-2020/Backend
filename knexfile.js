// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.db3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: false
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: 'test.db3',
    },
    useNullAsDefault: false,
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'seeds',
    },
  },

};
