const moviesService = require("./movies.service");
const knex = require("../db/connection.js");

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res) {
  const { is_showing } = req.query;

  if (is_showing === "true") {
    const movies = await moviesService.listShowingMovies();
    res.json({ data: movies });
  } else {
    const movies = await moviesService.list();
    res.json({ data: movies });
  }
}

function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

function listTheaters(req, res) {
  const { movieId } = req.params;

  knex("theaters as t")
    .select("t.*")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId, "mt.is_showing": true })
    .then((theaters) => {
      res.json({ data: theaters });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching theaters." });
    });
}

function listMovieReviews(req, res) {
  const { movieId } = req.params;

  knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      const reviewsWithCriticDetails = reviews.map((review) => {
        const { critic_id, ...criticInfo } = review;
        return {
          ...review,
          critic: criticInfo,
        };
      });

      res.json({ data: reviewsWithCriticDetails });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching movie reviews." });
    });
}

module.exports = {
  list,
  read: [movieExists, read],
  listTheaters,
  listMovieReviews,
};
