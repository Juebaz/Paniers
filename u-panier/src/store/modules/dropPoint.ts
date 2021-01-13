import { baseUrl } from "../index";
import axios from "axios";
import { DropPoint } from "../../types/dropPoint";

const state: any = {
  dropPoints: [],
};

const getters = {
  dropPoints: (state: any) => state.dropPoints,
};

const actions = {
  async fetchDropPoint(context, id: string) {
    const res = await axios.get(`${baseUrl}/dropPoint/${id}`);
    return res.data;
  },
  async fetchDropPoints(context) {
    const res = await axios.get(`${baseUrl}/dropPoints`);
    context.commit("setDropPoints", res.data);
    return res.data;
  },
  async postDropPoint(context, dropPoint: DropPoint) {
    const res = await axios.post(`${baseUrl}/dropPoints`, {
      dropPoint: dropPoint,
    });
    context.dispatch("fetchDropPoints");
    return res.data;
  },
  async updateDropPoint(context, payload: { dropPoint: DropPoint; id: string }) {
    const dp = payload.dropPoint;
    const res = await axios.put(`${baseUrl}/dropPoints/${payload.id}`, {
      dropPoint: dp,
    });
    context.dispatch("fetchDropPoints");
    return res.data;
  },
  async deleteDropPoint(context, id) {
    const res = await axios.delete(`${baseUrl}/dropPoints/${id}`);
    context.dispatch("fetchDropPoints");
    return res.data;
  },
};

const mutations = {
  setDropPoints: (state: any, dropPoints: any[]) => {
    state.dropPoints = dropPoints;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
