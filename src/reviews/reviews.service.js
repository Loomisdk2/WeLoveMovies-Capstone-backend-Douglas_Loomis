const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  //   critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  //   created_at: "critic.created_at",
  //   updated_at: "critic.updated_at",
});

function create(review) {
  return knex("reviews")
    .insert(review)
    .then((createdRecords) => createdRecords[0]);
}

function read(review_id) {
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
  // Join critic information after updating the record
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  create,
  read,
  readCritic,
  update,
  delete: destroy,
};
