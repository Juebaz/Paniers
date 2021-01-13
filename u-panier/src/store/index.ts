import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import products from "./modules/products";
import cart from "./modules/cart";
import dropPoint from "./modules/dropPoint";
import file from "./modules/file";
import farmInfo from "./modules/farmInfo";

export const baseUrl = "http://localhost:5000";

export default new Vuex.Store({
  modules: {
    products,
    cart,
    dropPoint,
    file,
    farmInfo,
  },
});
