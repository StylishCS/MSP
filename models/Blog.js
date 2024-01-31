const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  instagram: {
    type: String,
    required: false,
    maxLength: 255,
    default: "",
  },
  linkedin: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  facebook: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  twitter: {
    type: String,
    required: false,
    maxLength: 255,
    default: "",
  },
  image: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
},
{timestamps: true}
);

const Blog = mongoose.model("Blog", blogSchema);
exports.Blog = Blog;