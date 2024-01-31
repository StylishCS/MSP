const { TeamHistory } = require("../models/TeamHistory");
const fs = require("fs");

async function addTeamHistory(req, res) {
  try {
    const teamHistory = new TeamHistory({
      name: req.body.name,
      image: process.env.URL + req.file.filename,
      description: req.body.description,
    });
    await teamHistory.save();
    return res.status(201).json("Team History Added Successfully");
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

async function getTeamHistory(req, res) {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getTeamHistoryById(req, res) {
  try {
    const teamHistory = await TeamHistory.findById(req.params.id);
    if (!teamHistory) {
      return res.status(404).json("Team History Not Found...");
    }
    return res.status(200).json(teamHistory);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function editTeamHistory(req, res) {
  try {
    const teamHistory = await TeamHistory.findById(req.params.id);
    if (!teamHistory) {
      return res.status(404).json("Team History Not Found...");
    }
    let image = teamHistory.image;
    if (req.file) {
      const parts = image.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlink("../uploads/" + imageName, (err)=>{
        if(err){
            throw err;
        }
      });
      image = process.env.URL + req.file.filename;
    }
    const updatedTeamHistory = {
      name: req.body.name !== undefined ? req.body.name : teamHistory.name,
      description:
        req.body.description !== undefined
          ? req.body.description
          : teamHistory.description,
      image: image,
    };
    await teamHistory.updateOne(updatedTeamHistory);
    return res.status(200).json(updatedTeamHistory);
  } catch (error) {
    console.log(error)
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteTeamHistory(req, res) {
  try {
    const teamHistory = await TeamHistory.findById(req.params.id);
    if (!teamHistory) {
      return res.status(404).json("Team History Not Found...");
    }
    let image = teamHistory.image;
    const parts = image.split("/");
    const imageName = parts[parts.length - 1];
    fs.unlink("../uploads/" + imageName, (err) => {
      if (err) {
        throw err;
      }
    });
    await TeamHistory.findByIdAndDelete(req.params.id);
    return res.status(200).json("Team History Deleted Successfully.")
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  addTeamHistory,
  getTeamHistory,
  getTeamHistoryById,
  editTeamHistory,
  deleteTeamHistory,
};
