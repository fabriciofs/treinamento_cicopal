import Vue from "vue";
import Vuex from "vuex";

import PC from "./modules/PC"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    PC
  }
});
