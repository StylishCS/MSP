var express = require("express");
var router = express.Router();
const multer = require("multer");

const {
  testAddController,
  testGetController,
  protectedRoute,
  testUploadImage,
} = require("../controllers/dbTestController");
const AdminPrivileges = require("../middlewares/isAdmin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images/team");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/testPost", testAddController);
router.get("/testGet", testGetController);
router.get("/protected", AdminPrivileges, protectedRoute);
router.post("/uploadImage", upload.single("image"), testUploadImage);
module.exports = router;
