const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Product = require("./repositories/product");
const Cart = require("./repositories/cart");
const DropPoint = require("./repositories/dropPoint");
const serveIndex = require("serve-index");
const Uploader = require("./picture-manager");
const FarmInfo = require("./repositories/farmInfo");

const port = 5000;
const MONGOURL = "mongodb://localhost:27017/UPanier";

mongoose.set("useFindAndModify", false);

mongoose.connect(MONGOURL, { useNewUrlParser: true }, { useUnifiedTopology: true }).catch((err) => {
  console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // permet de recevoir les cookies
  })
);

app.use("/ftp", express.static("public"), serveIndex("public", { icons: true }));

app.listen(port, () => {
  console.log(`server listening on port ${port}...yeah !`);
});

app.get("/products", async (req, res) => {
  const products = await Product.getAll();
  if (!products) {
    return res.status(404).send("entry not found");
  }
  return res.status(200).json(products);
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.getById(id);
  if (!product) {
    return res.status(404).send("entry not found");
  }
  return res.status(200).json(product);
});

app.post("/product", async (req, res) => {
  const { product } = req.body;
  if (!product) {
    return res.status(404).send("no products in body");
  }
  const newproduct = await Product.create(product);
  return res.status(201).json(newproduct); // check code number
});

app.put("/product/:id", async (req, res) => {
  const { product } = req.body;
  const { id } = req.params;
  if (!product) {
    return res.status(404).send("no products in body");
  }
  const newproduct = await Product.update(id, product);
  return res.status(201).json(newproduct); // check code number
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("no id provided");
  }
  await Product.deleteproduct(id);
  return res.status(200).json({});
});

// Cart

app.post("/cart", async (req, res) => {
  const { item } = req.body;
  const newItem = await Cart.add(item);
  return res.status(201).json(newItem);
});

app.get("/cart/", async (req, res) => {
  const cart = await Cart.getCart();
  return res.status(200).json(cart);
});

app.put("/cart/", async (req, res) => {
  const { newCart } = req.body;
  const cart = await Cart.update(newCart);
  return res.status(200).json(cart);
});

app.delete("/cart/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send(" no item id provided");
  }
  const item = await Cart.deleteItem(id);
  return res.status(200).json(item);
});

// dropPoint

app.post("/dropPoints", async (req, res) => {
  const { dropPoint } = req.body;
  if (!dropPoint) {
    return res.status(400).send("missing droppoint info");
  }
  const newDP = await DropPoint.create(dropPoint);
  return res.status(201).json(newDP);
});

app.get("/dropPoints", async (req, res) => {
  const dps = await DropPoint.getAll();
  return res.status(200).json(dps);
});

app.get("/dropPoint/:id", async (req, res) => {
  const { id } = req.params;
  const dp = await DropPoint.getById(id);
  return res.status(200).json(dp);
});

app.put("/dropPoints/:id", async (req, res) => {
  const { id } = req.params;
  const { dropPoint } = req.body;
  const newDP = await DropPoint.update(id, dropPoint);
  return res.status(200).json(newDP);
});

app.delete("/dropPoints/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("no id provided");
  }
  await DropPoint.deleteDropPoint(id);
  return res.status(200).json({});
});

// storage

app.post("/upload", Uploader.upload.single("file"), function (req, res) {
  console.log(req);
  console.log("storage location is ", req.hostname + "/" + req.file.path);
  return res.send(req.file);
});

app.delete("/upload/:filename", (req, res) => {
  const { filename } = req.params;
  const data = Uploader.deleteFile(filename);
  return res.status(200).send(data);
});

// Farm Info

app.get("/farmInfo/", async (req, res) => {
  const info = await FarmInfo.get();
  return res.status(200).json(info);
});

app.put("/farmInfo/", async (req, res) => {
  const { info } = req.body;
  const exists = await FarmInfo.get();
  if (exists) {
    const updated = await FarmInfo.update(info);
    return res.status(200).send(updated);
  } else {
    const created = await FarmInfo.create(info);
    return res.status(200).send(created);
  }
});
