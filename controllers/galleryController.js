const { Gallery } = require("../models/Gallery");

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

module.exports = { addGalleryItem, getGalleryItems };
