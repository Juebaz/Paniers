const DropPoint = require("../models/dropPoint");
const Product = require("./product");

const getAll = async () => {
  return await DropPoint.find({});
};

const create = async (dropPoint) => {
  const newDP = await DropPoint.create({
    name: dropPoint.name,
    adress: dropPoint.adress,
    lat: dropPoint.lat,
    lon: dropPoint.lon,
  });
  return newDP;
};

const deleteDropPoint = async (id) => {
  // supprimer tout les reférence dans les autres models..
  Product.removeDropPoint(id);
  await DropPoint.deleteOne({ _id: id });
};

const getById = async (id) => {
  const dp = await DropPoint.findById(id);
  return dp;
};

const update = async (id, dropPoint) => {
  const item = await DropPoint.findOneAndUpdate(
    { _id: id },
    {
      name: dropPoint.name,
      adress: dropPoint.adress,
      lon: dropPoint.lon,
      lat: dropPoint.lat,
    },
    { new: true }
  );
  return item;
};

module.exports = { getAll, create, deleteDropPoint, getById, update };
