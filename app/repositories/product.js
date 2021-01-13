const Product = require("../models/product");

const getAll = async () => {
  return await Product.find({});
};

const create = async (product) => {
  const newproduct = await Product.create({
    name: product.name,
    description: product.description,
    price: product.price,
    startDate: product.startDate,
    endDate: product.endDate,
    frequency: product.frequency,
    dropPoints: product.dropPoints,
    img: product.img,
  });
  return newproduct;
};

const deleteproduct = async (id) => {
  await Product.deleteOne({ _id: id });
};

const getById = async (id) => {
  const item = await Product.findById(id);
  return item;
};

const update = async (id, product) => {
  const item = await Product.findOneAndUpdate(
    { _id: id },
    {
      name: product.name,
      description: product.description,
      price: product.price,
      dropPoints: product.dropPoints,
      startDate: product.startDate,
      img: product.img,
    },
    { new: true }
  );
  return item;
};

const removeDropPoint = async (id) => {
  let products = await getAll();

  await Promise.all(
    products.map(async (i) => {
      await i.updateOne({ _id: i._id, dropPoints: i.dropPoints.filter((j) => j != id) });
    })
  );
};

module.exports = { getAll, create, deleteproduct, getById, update, removeDropPoint };
