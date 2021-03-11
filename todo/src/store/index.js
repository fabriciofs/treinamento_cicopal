import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import Users from "./modules/Users";
import Tasks from "./modules/Tasks";

const modules = {
  Users,
  Tasks,
};

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules,
});
