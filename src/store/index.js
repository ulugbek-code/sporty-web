import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

const store = createStore({
  state() {
    return {
      isAuth: false,
      isCreateModule: false,
      isCreateLevel: false, //for create module
      isStudent: "empty",
      isGroup: "empty",
      currentStudent: null,
      currentGroup: null,
      token: "",
      error: "",
      qr: "",
      questions: [],
      allNotifications: [],
      moduleShort: [],
      timeTable: [],
      moduleLists: [],
      staffList: [],
      studentList: [],
      groupList: [],
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
