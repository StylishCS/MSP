var express = require("express");
const app = require("../app");
var router = express.Router();

const {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
} = require("../controllers/dashboardController");
const upload = require("../utils/uploadImage");
const {paginateData} = require("../middlewares/paginateData");
const { TeamMember } = require("../models/TeamMember");

router.post("/add", upload.single("image"), addTeamMember);
router.get("/get", paginateData(TeamMember), getTeamMembers);
router.delete("/delete/:id", deleteTeamMember);

module.exports = router;
