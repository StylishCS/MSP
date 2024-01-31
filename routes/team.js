var express = require("express");
const { addTeamMember } = require("../controllers/dashboardController");
const upload = require("../utils/uploadImage");
const app = require("../app");
var router = express.Router();

router.post("/add", upload.single("image"), addTeamMember);

app.use("/dashboard");

module.exports = router;