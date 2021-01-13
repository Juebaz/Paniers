import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import ProductsManager from "../views/ProductsManager.vue";
import DropPointsManager from "../views/DropPointsManager.vue";
import FarmInfo from "../views/FarmInfo.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/productsManager",
    name: "ProductsManager",
    component: ProductsManager,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/dropPointsManager",
    name: "DropPointsManager",
    component: DropPointsManager,
  },
  {
    path: "/farmInfo",
    name: "FarmInfo",
    component: FarmInfo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
