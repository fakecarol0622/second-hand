import { createStore } from "vuex";

export default createStore({
  state: {
    hasLogin: false,
  },
  getters: {
    hasLogin: state => state.hasLogin
  },
  mutations: {
    setStatus(state,flag) {
      state.hasLogin = flag
    }
  },
  actions: {
    userLogin({commit},flag) {
      commit("userStatus",flag)
    }
  },
  modules: {},
});
