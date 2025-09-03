const Review = require("../models/review");
const fs = require("fs");
const path = require("path");

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { reviewerName, title, review } = req.body;
    const photo = req.file ? `${process.env.URL}${req.file.filename}` : undefined;

    const newReview = new Review({
      reviewerName,
      title,
      review,
      photo,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews (paginated)
exports.getReviews = async (req, res) => {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewerName, title, review } = req.body;
    const reviewToUpdate = await Review.findById(req.params.id);

    if (!reviewToUpdate) {
      return res.status(404).json({ message: "Review not found" });
    }

    let photo = reviewToUpdate.photo;
    if (req.file) {
      // Delete the old photo only if it's not the default photo
      if (photo && !photo.includes("default_photo.png")) {
        const parts = photo.split("/");
        const imageName = parts[parts.length - 1];
        fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
          if (err) console.error("Failed to delete old photo:", err);
        });
      }
      photo = `${process.env.URL}${req.file.filename}`;
    }

    const updatedReview = {
      reviewerName: reviewerName || reviewToUpdate.reviewerName,
      title: title || reviewToUpdate.title,
      review: review || reviewToUpdate.review,
      photo: photo,
    };

    await reviewToUpdate.updateOne(updatedReview);
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Delete the photo only if it's not the default photo
    if (review.photo && !review.photo.includes("default_photo.png")) {
      const parts = review.photo.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
        if (err) console.error("Failed to delete photo:", err);
      });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};