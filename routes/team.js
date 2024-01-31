var express = require("express");
const app = require("../app");
var router = express.Router();

const {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
} = require("../controllers/dashboardController");
const upload = require("../utils/uploadImage");
const { TeamMember } = require("../models/TeamMember");
// const {paginateData} = require("../middlewares/paginateData");

/* Pagination Function */
async function paginateData(model) {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (endIndex < model.length) {
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

      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedData = results;
      next();
    } catch (error) {
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  };
}

router.post("/add", upload.single("image"), addTeamMember);
router.get("/get",paginateData(TeamMember), getTeamMembers);
router.delete("/delete/:id", deleteTeamMember);

module.exports = router;
