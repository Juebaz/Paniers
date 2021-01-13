import { baseUrl } from "../index";
import axios from "axios";
import { FarmInfo } from "@/types/farmInfo";

const state: any = {
  farmInfo: {},
};

const getters = {
  farmInfo: (state: any) => state.farmInfo,
};

const actions = {
  async fetchFarmInfo(context) {
    const res = await axios.get(`${baseUrl}/farmInfo/`);
    context.commit("setFarmInfo", res.data)
    return res.data;
  },

  async updateFarmInfo(context, farmInfo: FarmInfo) {
    const res = await axios.put(`${baseUrl}/farmInfo/`, {
      info: farmInfo,
    });
    context.dispatch("fetchFarmInfo");
    return res.data;
  },

};

const mutations = {
  setFarmInfo: (state: any, farmInfo: FarmInfo[]) => {
    state.farmInfo = farmInfo;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
