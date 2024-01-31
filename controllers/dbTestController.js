const { TestModel } = require("../models/TestModel");

async function testAddController(req, res) {
  const user = new TestModel({
    name: req.body.name,
    email: req.body.email,
  });
  await user.save();
  return res.status(200).send("Test User Added");
}

async function testGetController(req, res) {
  const users = await TestModel.find();
  return res.status(200).json(users);
}

async function protectedRoute(req, res) {
  return res.status(200).json("Allowed");
}

module.exports = { testAddController, testGetController, protectedRoute };
