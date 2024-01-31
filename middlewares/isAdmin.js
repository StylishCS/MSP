const { Admin } = require("../models/Admin");
const jwt = require("jsonwebtoken");

async function AdminPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json("FORBIDDEN");
    }
    const key = req.header("Authorization").split(" ")[0];
    const token = req.header("Authorization").split(" ")[1];
    if (key !== process.env.JWT_KEYWORD) {
      return res.status(401).json("FORBIDDEN");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded._id);
    if (!admin[0]) {
      return res.status(401).json("FORBIDDEN");
    }
    req.adminId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json("FORBIDDEN");
  }
}

module.exports = AdminPrivileges;
