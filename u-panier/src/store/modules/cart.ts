import { baseUrl } from "../index";
import axios from "axios";
import { Item } from "../../types/cart";

type State = {
  cart: Item[];
};

const state: State = {
  cart: [],
};

const getters = {
  cart: (state: State) => state.cart,
};

const actions = {
  async fetchCart(context) {
    const res = await axios.get(`${baseUrl}/cart`);
    context.commit("setCart", res.data);
  },
  async postToCart({ dispatch }, item: Item) {
    const res = await axios.post(
      `${baseUrl}/cart`,
      {
        item: item,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch("fetchCart");
  },

  async deleteCartItem({ dispatch }, id: string) {
    const res = await axios.delete(`${baseUrl}/cart/${id}`);
    dispatch("fetchCart");
  },

  async updateCartItems({ dispatch }, cart: Item[]) {
    const res = await axios.put(`${baseUrl}/cart/`, {
      newCart: cart,
    });
    dispatch("fetchCart");
  },
};

const mutations = {
  setCart: (state: State, cart: Item[]) => {
    state.cart = cart;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
