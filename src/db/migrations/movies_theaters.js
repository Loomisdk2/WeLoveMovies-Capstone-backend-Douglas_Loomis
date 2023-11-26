exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    // table.increments("movies_theaters").primary();
    table.integer("movie_id").unsigned().notNullable();
    table.integer("theater_id").unsigned().notNullable();
    table.boolean("is_showing").defaultTo(false);
    table.foreign("movie_id").references("movies.movie_id").onDelete("CASCADE");
    table
      .foreign("theater_id")
      .references("theaters.theater_id")
      .onDelete("CASCADE");
    table.primary(["movie_id", "theater_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
