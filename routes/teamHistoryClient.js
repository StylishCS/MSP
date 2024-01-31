var express = require("express");
const { TeamHistory } = require("../models/TeamHistory");
const {
  getTeamHistory,
  getTeamHistoryById,
} = require("../controllers/teamHistoryController");
var router = express.Router();

router.get("/get", paginatedResults(TeamHistory), getTeamHistory);
router.get("/getById/:id", getTeamHistoryById);

/* Pagination Function */
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
