const knex = require("../db/connection.js");
// Functions for database operations
async function list() {
  return knex("movies").select("*");
}

async function listMoviesShowing() {
  return knex("movies as m")
    .distinct("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true });
}

async function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

async function listTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

async function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .where({ "m.movie_id": movieId });
}

async function getCritics(criticId) {
  return knex("critics").where({ critic_id: criticId });
}

module.exports = {
  list,
  read,
  listMoviesShowing,
  listTheaters,
  listReviews,
  getCritics,
};
