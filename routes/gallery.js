var express = require("express");
const {
  addGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
  getGalleryItemById,
  updateGalleryItem,
  getSessionsGallery,
  getEventsGallery,
} = require("../controllers/galleryController");
const upload = require("../utils/uploadImage");
const { Gallery } = require("../models/Gallery");

var router = express.Router();

router.post("/add", upload.single("image"), addGalleryItem);
router.get("/get", paginatedResults(Gallery), getGalleryItems);
router.delete("/delete/:id", deleteGalleryItem);
router.get("/getById/:id", getGalleryItemById);
router.patch("/edit/:id", upload.single("image"), updateGalleryItem);
router.get("/getSessions", getSessionsGallery);
router.get("/getEvents", getEventsGallery);

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
