var express = require("express");
var router = express.Router();

const {
  testAddController,
  testGetController,
} = require("../controllers/dbTestController");

router.post("/testPost", testAddController);
router.get("/testGet", testGetController);
module.exports = router;
