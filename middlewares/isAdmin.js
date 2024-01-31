const { Admin } = require("../models/Admin");
const jwt = require("jsonwebtoken");

async function AdminPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      console.log("flag 1");
      console.log(req.header("Authorization"));
      return res.status(401).json("FORBIDDEN");
    }
    const key = req.header("Authorization").split(" ")[0];
    const token = req.header("Authorization").split(" ")[1];
    if (key !== process.env.JWT_KEYWORD) {
      console.log("flag 2");
      console.log(key);
      console.log(token);
      return res.status(401).json("FORBIDDEN");
    }
    console.log(key)
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = Admin.findById(decoded._id);
    console.log(admin)
    if (!admin[0]) {
      console.log("flag 3");
      console.log(decoded._id)
    //   console.log(admin);
    //   console.log(admin[0]);
      return res.status(401).json("FORBIDDEN");
    }
    req.adminId = decoded._id;
    console.log(req.adminId);
    next();
  } catch (error) {
    console.log("flag 4");
    console.log(error);
    return res.status(401).json("FORBIDDEN");
  }
}

module.exports = AdminPrivileges;
