var express = require("express");
var router = express.Router();

const {
  testAddController,
  testGetController,
} = require("../controllers/dbTestController");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/testPost", testAddController);
router.get("/testGet", testGetController);
module.exports = router;
