const Cart = require("../models/cart");

const add = async (item) => {
  const cart = await Cart.findOne();
  if (cart) {
    const sameItem = cart.items.find((i) => isSameItem(i, item));
    if (sameItem) {
      cart.items = cart.items.map((i) => {
        if (isSameItem(i, item)) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
    } else {
      cart.items = [...cart.items, { ...item, quantity: 1 }];
    }

    const newCart = await cart.save();
    return newCart;
  } else {
    const newCart = Cart.create({
      items: [{ ...item, quantity: 1 }],
    });
    return newCart;
  }
};

const getCart = async () => {
  const cart = await Cart.findOne({});
  if (!cart) {
    return [];
  } else {
    return cart;
  }
};

const deleteItem = async (id) => {
  const cart = await Cart.findOne({});
  cart.items = cart.items.filter((i) => i.id != id);
  await cart.save();
  return {};
};

const update = async (newItems) => {
  const cart = await Cart.findOne({});
  cart.items = newItems;
  await cart.save();
  return cart;
};

const isSameItem = (i, item) => {
  return i.id == item.id && i.dropPoint == item.dropPoint;
};

module.exports = { add, getCart, deleteItem, update };
