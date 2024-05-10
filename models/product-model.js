const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  decsription: { type: String, required: true },
  old_price: { type: String, required: true },
  discount: { type: String, required: true },
  new_price: { type: String, required: true },
  color: { type: String, required: true },
  gender: { type: String, required: true },
  brands: { type: [String], required: true },
  occasion: { type: [String], required: true },
  rating: { type: String, required: true },
  category: { type: [String], required: true },
  image: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
