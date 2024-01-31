var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
  return res.status(200).json("server works properly...")
});

module.exports = router;
