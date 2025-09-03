var express = require("express");
const {
  getGalleryItems,
  getGalleryItemById,
  getEventsGallery,
  getSessionsGallery
} = require("../controllers/galleryController");
const { Gallery } = require("../models/Gallery");
const paginatedResults = require("../utils/pagination");

var router = express.Router();

router.get("/get", paginatedResults(Gallery), getGalleryItems);
router.get("/getEvents", getEventsGallery);
router.get("/getSessions", getSessionsGallery);
router.get("/getById/:id", getGalleryItemById);

module.exports = router;
