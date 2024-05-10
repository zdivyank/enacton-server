const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },

});

const brand = mongoose.model('categorie', categorySchema);

module.exports =brand;
