const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
require("mongoose-type-url");

const urlValidator = (value) => {
  return validator.isURL(value, {
    protocols: ["http", "https", "ftp"],
    require_tld: true,
    require_protocol: true,
  });
};

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    phone: {
      type: String,
      required: false,
      default: "",
      maxLength: 255,
      unique: true,
      index: true,
    },
    track: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
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
    behanceOrGithub: {
      type: String,
      required: false,
      default: "",
      maxLength: 255,
    },
    linktree: {
      type: String,
      required: false,
      default: "",
      maxLength: 255,
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
  { timestamps: true }
);


const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
exports.TeamMember = TeamMember;
