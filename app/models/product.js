const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  startDate: Object,
  dropPoints: [String],
  img: String,
});

const product = mongoose.model("product", productSchema);

module.exports = product;
