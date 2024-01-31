const multer = require("multer");
const { TestModel } = require("../models/TestModel");
const { path } = require("../app");


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

// async function testUploadImage(req, res) {
//   var storage = multer.diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, "../public/images/team");
//     },
//     filename: (request, file, callback) => {
//       var temp_file_arr = file.originalname.split(".");
//       var temp_file_name = temp_file_arr[0];
//       var temp_file_extension = temp_file_arr[1];
//       callback(null, temp_file_name + "-" + Date.now() + "." + temp_file_extension)
//     },
//   });
//   var upload = multer({storage: storage}).single('sample_image');
//   upload(request, response, (error)=>{
//     if(error){
//       return response.end("Error uploading File");
//     }
//     else{
//       return response.end("File is uploaded successfully")
//     }
//   })
// }

async function testUploadImage(req, res) {
  return res.status(200).json("uploaded");
}

module.exports = {
  testAddController,
  testGetController,
  protectedRoute,
  testUploadImage,
};
