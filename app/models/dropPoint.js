const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Schema } = mongoose;

const dropPointSchema = new Schema({
  lat: Number,
  lon: Number,
  adress: String,
  name: String,
});

const dropPoint = mongoose.model("DropPoint", dropPointSchema);

module.exports = dropPoint;
