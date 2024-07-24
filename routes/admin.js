var express = require("express");
const {
  adminLoginController,
  seedAdminController,
} = require("../controllers/adminLoginController");
var router = express.Router();

router.post("/login", adminLoginController);
router.post("/seed", seedAdminController);

module.exports = router;
