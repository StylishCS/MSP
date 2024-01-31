var express = require("express");
var router = express.Router();

const upload = require("../utils/uploadImage");
const { Blog } = require("../models/Blog");
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

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      if (!results.results) {
        return res.status(404).json("No Data Found");
      }
      res.paginatedResults = results;
      next();
    } catch (e) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  };
}

module.exports = router;
