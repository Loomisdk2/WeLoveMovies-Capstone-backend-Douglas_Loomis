const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./theaters.controller");

router.route("/").get(controller.getAllTheaters).all(methodNotAllowed);

module.exports = router;
