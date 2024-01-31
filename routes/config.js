var express = require("express");
var router = express.Router();

const {
  testAddController,
  testGetController,
  protectedRoute,
} = require("../controllers/dbTestController");
const AdminPrivileges = require("../middlewares/isAdmin");

router.post("/testPost", testAddController);
router.get("/testGet", testGetController);
router.get("/protected", AdminPrivileges, protectedRoute);
module.exports = router;
