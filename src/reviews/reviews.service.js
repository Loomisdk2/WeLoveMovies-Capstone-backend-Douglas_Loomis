const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// Helper function
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// Database operations functions
async function list() {
  return knex("reviews");
}

async function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function readCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}
module.exports = {
  list,
  read,
  readCritic,
  update,
  delete: destroy,
};
