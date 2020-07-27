import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    websites: [],
    displayWebsites: [],
    rows: 0
  },
  mutations: {
    SET_WEBSITES(state, websites) {
      state.websites = websites;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_DISPLAY_WEBSITES(state, displayWebsites) {
      state.displayWebsites = displayWebsites;
    }
  },
  actions: {
    // Async task must be placed here, puts the request to the backend
    async fetchData() {
      return new Promise(resolve => {
        setTimeout(async () => {
          const result = await fetch("webs.json");
          const value = await result.json();
          resolve(value);
        }, 1000);
      });
    },
    async fetchWebsites({ dispatch, commit }) {
      const myJson = await dispatch("fetchData");
      commit("SET_WEBSITES", myJson);
      const displayWebsites = myJson.slice(0, 3);
      commit("SET_DISPLAY_WEBSITES", displayWebsites);
      commit("SET_ROWS", myJson.length);
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const websites = state.websites.slice(start, start + 3);
      commit("SET_DISPLAY_WEBSITES", websites);
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_WEBSITES", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async search({ dispatch }, { text }) {
      const myJson = await this.dispatch("fetchData");
      const values = myJson.filter(value =>
        value.name.toLowerCase().includes(text.toLowerCase())
      );
      dispatch("updataePagination", {
        myJson: values,
        currentPage: 1,
        perPage: 3
      });
    }
  },
  getters: {
    websites(state) {
      return state.websites;
    },
    rows(state) {
      return state.rows;
    },
    displayWebsites(state) {
      return state.displayWebsites;
    }
  },
  modules: {}
});
