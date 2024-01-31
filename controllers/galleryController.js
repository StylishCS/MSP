const { Gallery } = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

/* Gallery Route Controllers */
async function addGalleryItem(req, res) {
  try {
    const galleryItem = new Gallery({
      name: req.body.name,
      image: process.env.URL + req.file.filename,
    });
    await galleryItem.save();
    return res.status(201).json("Image Added To Gallery.");
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

async function getGalleryItems(req, res) {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getGalleryItemById(req, res) {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json("Item Not Found In The Gallery...");
    }
    return res.status(200).json(galleryItem);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteGalleryItem(req, res) {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json("Item Not Found In The Gallery...");
    }
    let image = galleryItem.image;
    const parts = image.split("/");
    const imageName = parts[parts.length - 1];
    fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
      if (err) {
        throw err;
      }
    });
    await Gallery.findByIdAndDelete(req.params.id);
    return res.status(200).json("Item Deleted From The Gallery Successfully");
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function updateGalleryItem(req, res) {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json("Item Not Found In The Gallery...");
    }
    let image = galleryItem.image;
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
    const updatedItem = {
      name: req.body.name !== undefined ? req.body.name : galleryItem.name,
      image: image,
    };
    await galleryItem.updateOne(updatedItem);
    return res.status(200).json(updatedItem);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  addGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
  getGalleryItemById,
  updateGalleryItem,
};
