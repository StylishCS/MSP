const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  is_open: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Form', formSchema);