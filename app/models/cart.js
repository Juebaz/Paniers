const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  items: [], //{id: string, dropPoint: string, quantity: number}
});

const cart = mongoose.model("Cart", cartSchema);

module.exports = cart;
