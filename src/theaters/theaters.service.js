const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  image_url: ["movies", null, "image_url"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
});

async function getAllTheatersAndMovies() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .then(reduceMovies);
}

async function list() {
  return knex("theaters").select("*");
}

module.exports = {
  list,
  getAllTheatersAndMovies,
};
