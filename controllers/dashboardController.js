const multer = require("multer");
const { TeamMember } = require("../models/TeamMember");

async function addTeamMember(req, res) {
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
  return res.status(200).json(teamMember);
}

async function getTeamMembers(req, res) {
  const teamMembers = await TeamMember.find();
  if (!teamMembers) {
    return res.status(400).json("No Team Members Found..");
  }
  return res.status(200).json(teamMembers);
}

async function deleteTeamMember(req, res) {
  const teamMember = await TeamMember.findById(req.params.id);
  if (!teamMember) {
    return res.status(400).json("Team Member Not Found..");
  }
  await TeamMember.findByIdAndDelete(req.params.id);
  return res.status(200).json("Team Member Deleted.");
}

module.exports = { addTeamMember, getTeamMembers, deleteTeamMember };
