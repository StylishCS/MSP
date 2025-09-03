const mongoose = require("mongoose");
require("dotenv").config();

const reviewSchema = new mongoose.Schema(
  {
    reviewerName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    review: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 1000,
    },
    photo: {
      type: String,
      required: false,
      default: `${process.env.URL}public/default_photo.png`,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;