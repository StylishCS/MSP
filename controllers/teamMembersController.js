const { TeamMember } = require("../models/TeamMember");
const fs = require("fs");
const path = require("path");

/* Team Members Route Controllers */
async function addTeamMember(req, res) {
  try {
    const teamMember = new TeamMember({
      name: req.body.name,
      phone: req.body.phone,
      track: req.body.track,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      behanceOrGithub: req.body.behanceOrGithub,
      linktree: req.body.linktree,
      image: process.env.URL + req.file.filename,
      description: req.body.description,
    });
    await teamMember.save();
    return res.status(201).json(teamMember);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        if (error.errors[key].message == "validator is not defined") {
          error.errors[key].message = `Must be a Valid URL`;
        }
        errors[key] = error.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    if (error.name === "MongoServerError") {
      return res.status(400).json({ phone: "Phone Number Already Exist." });
    }
    console.log(error)
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getTeamMembers(req, res) {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getTeamMemberById(req, res) {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json("Member Not Found");
    }
    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteTeamMember(req, res) {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(400).json("Team Member Not Found..");
    }
    let image = teamMember.image;
    const parts = image.split("/");
    const imageName = parts[parts.length - 1];
    fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
      if (err) {
        console.log("something went wrong");
      }
    });
    await TeamMember.findByIdAndDelete(req.params.id);
    return res.status(200).json("Team Member Deleted.");
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function updateTeamMember(req, res) {
  try {
    let teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json("Member Not Found...");
    }
    let image = teamMember.image;
    if (req.file) {
      const parts = image.split("/");
      const imageName = parts[parts.length - 1];
      fs.unlink(path.join(__dirname, "../uploads/", imageName), (err) => {
        if (err) {
          console.log("something went wrong");
        }
      });
      image = process.env.URL + req.file.filename;
    }
    let updatedMember = {
      name: req.body.name !== undefined ? req.body.name : teamMember.name,
      phone: req.body.phone !== undefined ? req.body.phone : teamMember.phone,
      track: req.body.track !== undefined ? req.body.track : teamMember.track,
      linkedin:
        req.body.linkedin !== undefined
          ? req.body.linkedin
          : teamMember.linkedin,
      facebook:
        req.body.facebook !== undefined
          ? req.body.facebook
          : teamMember.facebook,
      behanceOrGithub:
        req.body.behanceOrGithub !== undefined
          ? req.body.behanceOrGithub
          : teamMember.behanceOrGithub,
      linktree:
        req.body.linktree !== undefined
          ? req.body.linktree
          : teamMember.linktree,
      image: image,
      description:
        req.body.description !== undefined
          ? req.body.description
          : teamMember.description,
    };
    await teamMember.updateOne(updatedMember);
    return res.status(200).json(updatedMember);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
  updateTeamMember,
  getTeamMemberById,
};
