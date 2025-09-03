var express = require("express");
var router = express.Router();
const {
  getTeamMembers,
  getTeamMemberById,
} = require("../controllers/teamMembersController");
const { TeamMember } = require("../models/TeamMember");
const paginatedResults = require("../utils/pagination");

router.get("/get", paginatedResults(TeamMember), getTeamMembers);
router.get("/getById/:id", getTeamMemberById);

module.exports = router;
