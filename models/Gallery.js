const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Events', 'Sessions'],
      minLength: 3,
      maxLength: 255,
    },
    image: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
exports.Gallery = Gallery;
