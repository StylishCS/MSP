var express = require("express");
const { adminLoginController } = require("../controllers/adminLoginController");
var router = express.Router();

router.post("/login", adminLoginController);

module.exports = router;
