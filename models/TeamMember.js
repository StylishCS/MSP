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
      maxLength: 255,
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
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["http", "https", "ftp"],
            require_tld: true,
            require_protocol: true,
          }),
        message: "Must be a Valid URL",
      },
    },
    facebook: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["http", "https", "ftp"],
            require_tld: true,
            require_protocol: true,
          }),
        message: "Must be a Valid URL",
      },
    },
    behanceOrGithub: {
      type: String,
      required: false,
      default: "",
      maxLength: 255,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["http", "https", "ftp"],
            require_tld: true,
            require_protocol: true,
          }),
        message: "Must be a Valid URL",
      },
    },
    linktree: {
      type: String,
      required: false,
      default: "",
      maxLength: 255,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["http", "https", "ftp"],
            require_tld: true,
            require_protocol: true,
          }),
        message: "Must be a Valid URL",
      },
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
