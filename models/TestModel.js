const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const TestModel = mongoose.Model("TestModel", testSchema);
exports.TestModel = TestModel;
