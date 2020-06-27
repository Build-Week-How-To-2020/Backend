
exports.up = function(knex) {
  return knex.schema.createTable('users', (tbl)=> {
      tbl.increments('id')
      tbl.string('username')
        .unique()
        .notNullable()
      tbl.string('password')
        .unique()
        .notNullable()
  })
    .createTable('how-to', (tbl)=> {
      tbl.increments('id')
      tbl.integer('userid')
      tbl.string('name')
      tbl.integer('steps')
        .notNullable()
    })
    .createTable('steps', (tbl)=> {
      tbl.increments('id')
      tbl.integer('howToId')
      tbl.integer('step-number')
        .notNullable()
      tbl.string('description')
        .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
    .dropTableIfExists("how-to")
    .dropTableIfExists("steps")
};
