const reviewsService = require("./reviews.service");

const VALID_PROPERTIES = ["content", "score"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function create(req, res, next) {
  const data = await reviewsService.create(req.body.data);
  res.status(201).json({ data });
}

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res) {
  const { reviewId } = req.params;
  const { content, score } = req.body;

  // Prepare the updated review
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  // Update the review
  const updated = await reviewsService.update(updatedReview);

  // Fetch the critic details
  const critic = await reviewsService.readCritic(updatedReview.review_id);

  // Include critic details in the response

  res.json({ data: critic });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

async function read(req, res) {
  res.json({ data: res.locals.review });
}

module.exports = {
  create,
  read: [reviewExists, read],
  update: [hasOnlyValidProperties, reviewExists, update],
  delete: [reviewExists, destroy],
};
