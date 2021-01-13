import { baseUrl } from "../index";
import axios from "axios";

const getters = {};

const actions = {
  async postFile({ dispatch }, file: File) {
    console.log("vuex", file);
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${baseUrl}/upload/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  async removeFile({ dispatch }, filename: string) {
    const res = await axios.delete(`${baseUrl}/upload/${filename}`);
    return res.data;
  },
};

const mutations = {};

export default {
  getters,
  actions,
  mutations,
};
