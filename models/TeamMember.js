const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
require("mongoose-type-url");

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
      unique: [true, "Phone number is already in use."],
      default: "",
      minLength: 3,
      maxLength: 255,
    },
    track: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    linkedin: {
      type: mongoose.SchemaTypes.Url,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    facebook: {
      type: mongoose.SchemaTypes.Url,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    behanceOrGithub: {
      type: mongoose.SchemaTypes.Url,
      required: false,
      minLength: 3,
      maxLength: 255,
    },
    linktree: {
      type: mongoose.SchemaTypes.Url,
      required: false,
      minLength: 3,
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
