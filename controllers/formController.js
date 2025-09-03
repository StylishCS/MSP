const Form = require('../models/form');

// POST /form - Create a form if it doesn't exist
exports.createForm = async (req, res) => {
  try {
    const existingForm = await Form.findOne();
    if (existingForm) {
      return res.status(400).json({ message: 'Form already exists' });
    }
    const newForm = new Form();
    await newForm.save();
    res.status(201).json({
      is_open: newForm.is_open,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /form - Get the form
exports.getForm = async (req, res) => {
  try {
    const forms = await Form.find();
    if (forms.length === 0) {
      return res.status(404).json({ message: 'No form found' });
    }
    res.json({
      is_open: forms[0].is_open,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /form - Update the form
exports.updateForm = async (req, res) => {
  try {
    const forms = await Form.find();
    if (forms.length === 0) {
      return res.status(404).json({ message: 'No form found' });
    }
    const form = forms[0];
    form.is_open = req.body.is_open;
    await form.save();
    res.json({
      is_open: form.is_open,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};