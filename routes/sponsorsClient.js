var express = require("express");
const { Sponsor } = require("../models/Sponsor");
const { getSponsors } = require("../controllers/sponsorController");
const paginatedResults = require("../utils/pagination");

var router = express.Router();

router.get("/get", paginatedResults(Sponsor), getSponsors);

module.exports = router;
