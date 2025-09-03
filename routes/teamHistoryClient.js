var express = require("express");
const { TeamHistory } = require("../models/TeamHistory");
const {
  getTeamHistory,
  getTeamHistoryById,
} = require("../controllers/teamHistoryController");
const paginatedResults = require("../utils/pagination");
var router = express.Router();

router.get("/get", paginatedResults(TeamHistory), getTeamHistory);
router.get("/getById/:id", getTeamHistoryById);

module.exports = router;
