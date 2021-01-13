import { Product } from "../../types/product";
import { baseUrl } from "../index";
import axios from "axios";

type State = {
  products: Product[];
};

const state: State = {
  products: [],
};

const getters = {
  products: (state: State) => state.products,
};

const actions = {
  async fetchproducts(context) {
    const res = await axios.get(`${baseUrl}/products`);
    const items = res.data.map((i: Product) => {
      return { ...i, startDate: new Date(i.startDate) };
    });
    context.commit("setproducts", items);
    return items;
  },
  async fetchproduct(context, id: string) {
    const res = await axios.get(`${baseUrl}/product/${id}`);
    return res.data;
  },
  async postproduct(context, product: Product) {
    const res = await axios.post(`${baseUrl}/product`, { product });
    context.dispatch("fetchproducts");
    return res.data;
  },
  async updateProduct(context, payload: { id: string; product: Product }) {
    const newProduct = payload.product;
    const res = await axios.put(`${baseUrl}/product/${payload.id}`, {
      product: newProduct,
    });
    context.dispatch("fetchproducts");
    return res.data;
  },
  async deleteProduct(context, id: string) {
    const res = await axios.delete(`${baseUrl}/product/${id}`);
    context.dispatch("fetchproducts");
    return res.data;
  },
};

const mutations = {
  setproducts: (state: State, products: Product[]) => {
    state.products = products;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
