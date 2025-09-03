var express = require("express");
var router = express.Router();

const { Blog } = require("../models/Blog");
const paginatedResults = require("../utils/pagination");
const {
  getBlogByIdController,
  getBlogsController,
} = require("../controllers/blogController");

router.get("/get", paginatedResults(Blog), getBlogsController);
router.get("/getById/:id", getBlogByIdController);

module.exports = router;
