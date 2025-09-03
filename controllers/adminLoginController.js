const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin } = require("../models/Admin");

async function adminLoginController(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("No Email Or Password Provided...");
    }
    const user = await Admin.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Email Or Password...");
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json("Wrong Email Or Password...");
    }

    // Include role in the JWT
    const token = jwt.sign(
      { _id: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function seedAdminController(req, res) {
  try {
    if (await Admin.findOne({ email: "admin" })) {
      return res.status(400).json("Admin Already Exists...");
    }
    const admin = new Admin({
      email: "admin",
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    });
    await admin.save();
    return res.status(201).json(admin);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { adminLoginController, seedAdminController };
