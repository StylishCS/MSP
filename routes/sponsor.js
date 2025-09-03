var express = require("express");
const { Sponsor } = require("../models/Sponsor");
const upload = require("../utils/uploadImage");
const paginatedResults = require("../utils/pagination");
const {
  addSponsor,
  getSponsors,
  deleteSponsorController,
} = require("../controllers/sponsorController");

var router = express.Router();

router.get("/get", paginatedResults(Sponsor), getSponsors);
router.post("/add", upload.single("image"), addSponsor);
router.delete("/delete/:id", deleteSponsorController);

module.exports = router;
