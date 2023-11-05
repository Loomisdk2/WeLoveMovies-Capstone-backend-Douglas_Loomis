const router = require("express").Router();

const controller = require("./theaters.controller");

router.route("/").get(controller.getAllTheaters);

module.exports = router;
