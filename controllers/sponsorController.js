const { Sponsor } = require("../models/Sponsor");

async function addSponsor(req, res) {
  try {
    const sponsor = new Sponsor({
      image: process.env.URL + req.file.filename,
    });
    await sponsor.save();
    return res.status(201).json("Sponsor Created Successfully");
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
async function getSponsors(req, res) {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { addSponsor, getSponsors };
