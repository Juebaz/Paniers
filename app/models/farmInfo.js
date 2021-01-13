const mongoose = require("mongoose");
const { Schema } = mongoose;

const FarmSchema = new Schema({
  name: String,
  adress: String,
  phone: String,
  email: String,
  msg: String,
  facebook: String,
  instagram: String,
  pictures: { coverPic: String, carrousel: [String] },
});

const farmInfo = mongoose.model("farm", FarmSchema);

module.exports = farmInfo;
