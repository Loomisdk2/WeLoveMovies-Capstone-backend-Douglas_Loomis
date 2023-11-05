const knex = require("../db/connection.js");

function list() {
  return knex("movies").select("*");
}

function listShowingMovies() {
  return knex("movies")
    .distinct("movies.*")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where({ "movies_theaters.is_showing": true });
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

function listTheaterMovies(movieId) {
  return knex("theaters as t")
    .select("t.*")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId, "mt.is_showing": true })
    .then((theaters) => res.json({ data: theaters }));
}

module.exports = {
  list, // Make sure to export the function
  read,
  listTheaterMovies,
  listShowingMovies,
};
