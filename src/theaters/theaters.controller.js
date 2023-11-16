const reduceProperties = require("../utils/reduce-properties");
const theatersService = require("./theaters.service");
const moviesService = require("../movies/movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Definition of the combineTheaterWithMovies function
const combineTheaterWithMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  is_showing: ["movies", null, "is_showing"],
});

// Middleware and request handlers
async function getAllTheaters(req, res, next) {
  const [theaters, movies] = await Promise.all([
    theatersService.getAllTheatersAndMovies(),
    moviesService.list(),
  ]);

  const data = combineTheaterWithMovies(theaters, movies);
  console.log(data);
  res.json({ data });
}

async function list(req, res) {
  const data = await theatersService.list();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  getAllTheaters: [asyncErrorBoundary(getAllTheaters)],
};
