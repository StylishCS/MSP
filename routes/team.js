var express = require("express");
const {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
} = require("../controllers/dashboardController");
const upload = require("../utils/uploadImage");

const app = require("../app");
var router = express.Router();

router.post("/add", upload.single("image"), addTeamMember);
router.get("/get", getTeamMembers);
router.delete("/delete/:id", deleteTeamMember);

module.exports = router;
