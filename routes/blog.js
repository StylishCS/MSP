var express = require("express");
var router = express.Router();

const upload = require("../utils/uploadImage");
const { Blog } = require("../models/Blog");
const paginatedResults = require("../utils/pagination");
const {
  addBlogController,
  deleteBlogController,
  editBlogController,
  getBlogByIdController,
  getBlogsController,
} = require("../controllers/blogController");

router.get("/get", paginatedResults(Blog), getBlogsController);
router.get("/getById/:id", getBlogByIdController);
router.post("/add", upload.single("image"), addBlogController);
router.patch("/edit/:id", upload.single("image"), editBlogController);
router.delete("/delete/:id", deleteBlogController);

module.exports = router;
