var express = require("express");
const app = require("../app");

var router = express.Router();
const {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
  updateTeamMember,
  getTeamMemberById,
} = require("../controllers/teamMembersController");
const upload = require("../utils/uploadImage");
const { TeamMember } = require("../models/TeamMember");
const paginatedResults = require("../utils/pagination");

router.post("/add", upload.single("image"), addTeamMember);
router.get("/get", paginatedResults(TeamMember), getTeamMembers);
router.delete("/delete/:id", deleteTeamMember);
router.patch("/edit/:id", upload.single("image"), updateTeamMember);
router.get("/getById/:id", getTeamMemberById);

module.exports = router;
