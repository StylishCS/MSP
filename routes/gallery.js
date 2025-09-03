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
const paginatedResults = require("../utils/pagination");

var router = express.Router();

router.post("/add", upload.single("image"), addGalleryItem);
router.get("/get", paginatedResults(Gallery), getGalleryItems);
router.delete("/delete/:id", deleteGalleryItem);
router.get("/getById/:id", getGalleryItemById);
router.patch("/edit/:id", upload.single("image"), updateGalleryItem);
router.get("/getSessions", getSessionsGallery);
router.get("/getEvents", getEventsGallery);

module.exports = router;
