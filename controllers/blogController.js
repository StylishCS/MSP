const { Blog } = require("../models/Blog");
const fs = require("fs");
const path = require("path");

async function addBlogController(req, res) {
  try {
    const blog = new Blog({
      name: req.body.name,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      image: process.env.URL + req.file.filename,
      description: req.body.description,
    });
    await blog.save();
    return res.status(201).json("Blog Created Successfully.");
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getBlogsController(req, res) {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function getBlogByIdController(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json("Blog Not Found...");
    }
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function editBlogController(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json("Blog Not Found...");
    }
    let image = blog.image;
    if (req.file) {
      const parts = image.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
        if (err) {
          throw err;
        }
      });
      image = process.env.URL + req.file.filename;
    }
    const updatedBlog = {
      name: req.body.name !== undefined ? req.body.name : blog.name,
      instagram:
        req.body.instagram !== undefined ? req.body.instagram : blog.instagram,
      linkedin:
        req.body.linkedin !== undefined ? req.body.linkedin : blog.linkedin,
      facebook:
        req.body.facebook !== undefined ? req.body.facebook : blog.facebook,
      twitter: req.body.twitter !== undefined ? req.body.twitter : blog.twitter,
      image: image,
      description:
        req.body.description !== undefined
          ? req.body.description
          : blog.description,
    };
    await blog.updateOne(updatedBlog);
    return res.status(200).json("Blog Updated Successfully");
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function deleteBlogController(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json("Blog Not Found...");
    }
    let image = blog.image;
    const parts = image.split("/");
    const imageName = parts[parts.length - 1];
    fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
      if (err) {
        throw err;
      }
    });
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json("Blog Deleted Successfully");
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  addBlogController,
  getBlogsController,
  getBlogByIdController,
  editBlogController,
  deleteBlogController,
};
