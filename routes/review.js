const express = require("express");
const reviewController = require("../controllers/reviewController");
const upload = require("../utils/uploadImage");
const paginatedResults = require("../utils/pagination");
const Review = require("../models/review");
const AdminPrivileges = require("../middlewares/isAdmin");

const router = express.Router();

// Add a review (protected by admin privileges)
router.post("/", AdminPrivileges, upload.single("photo"), reviewController.addReview);

// Get all reviews (paginated)
router.get("/", paginatedResults(Review), reviewController.getReviews);

// Get a single review by ID
router.get("/:id", reviewController.getReviewById);

// Update a review (protected by admin privileges)
router.patch("/:id", AdminPrivileges, upload.single("photo"), reviewController.updateReview);

// Delete a review (protected by admin privileges)
router.delete("/:id", AdminPrivileges, reviewController.deleteReview);

module.exports = router;