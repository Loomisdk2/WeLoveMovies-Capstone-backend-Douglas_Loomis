exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    table.integer("critic_id").unsigned();
    table.integer("movie_id").unsigned();
    table.timestamp(true, true);
    table.foreign("critic_id").references("critic_id").inTable("critics");
    table.foreign("movie_id").references("movie_id").inTable("movies");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
