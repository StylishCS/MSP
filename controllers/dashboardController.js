const multer = require('multer');
const { TeamMember } = require('../models/TeamMember');

async function addTeamMember(req,res){
    const teamMember = new TeamMember({
        name: req.body.name,
        phone: req.body.phone,
        track: req.body.track,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        behanceOrGithub: req.body.behanceOrGithub,
        linktree: req.body.linktree,
        
    })
}