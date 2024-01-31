var express = require("express");
const { addTeamMember } = require("../controllers/dashboardController");
const upload = require("../utils/uploadImage");
var router = express.Router();

router.post("/add", upload.single("image"), addTeamMember);

module.exports = router;