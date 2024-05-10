const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },

});

const brand = mongoose.model('brand', brandSchema);

module.exports =brand;
