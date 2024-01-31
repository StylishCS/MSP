var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require('path');
const upload = require("../utils/uploadImage");

const {
  testAddController,
  testGetController,
  protectedRoute,
  testUploadImage,
} = require("../controllers/dbTestController");
const AdminPrivileges = require("../middlewares/isAdmin");


router.post("/testPost", testAddController);
router.get("/testGet", testGetController);
router.get("/protected", AdminPrivileges, protectedRoute);
router.post("/uploadImage", upload.single("image"), testUploadImage);
module.exports = router;
