var express = require("express");
const { TeamHistory } = require("../models/TeamHistory");
const upload = require("../utils/uploadImage");
const {
  addTeamHistory,
  deleteTeamHistory,
  editTeamHistory,
  getTeamHistory,
  getTeamHistoryById,
} = require("../controllers/teamHistoryController");
const paginatedResults = require("../utils/pagination");
var router = express.Router();

router.get("/get", paginatedResults(TeamHistory), getTeamHistory);
router.get("/getById/:id", getTeamHistoryById);
router.post("/add", upload.single("image"), addTeamHistory);
router.patch("/edit/:id", upload.single("image"), editTeamHistory);
router.delete("/delete/:id", deleteTeamHistory);

module.exports = router;
