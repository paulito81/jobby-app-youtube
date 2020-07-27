import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    websites: [],
    displayWebsites: [],
    rows: 0,
    showSpinner: false
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
    },
    SET_SPINNER(state, spinner) {
      state.showSpinner = spinner;
    }
  },
  actions: {
    // Async task must be placed here, puts the request to the backend
    async fetchData({ commit }) {
      commit("SET_SPINNER", true);
      return new Promise(resolve => {
        setTimeout(async () => {
          const result = await fetch("webs.json");
          const value = await result.json();
          resolve(value);
          commit("SET_SPINNER", false);
        }, 1000);
      });
    },

    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_WEBSITES", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },

    async fetchWebsites({ dispatch }) {
      //, commit }) {
      const myJson = await dispatch("fetchData");
      dispatch("updatePagination", { myJson, currentPage: 1, perPage: 3 });
      return myJson;
      // commit("SET_WEBSITES", myJson);
      // commit("SET_ROWS", myJson.length);
      // const displayWebsites = myJson.slice(0, 3);
      // commit("SET_DISPLAY_WEBSITES", displayWebsites);
      // commit("SET_ROWS", myJson.length);
    },

    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const websites = state.websites.slice(start, start + 3);
      commit("SET_DISPLAY_WEBSITES", websites);
    },

    async search({ dispatch }, { text }) {
      const myJson = await dispatch("fetchData");
      var values;
      try {
        values = myJson.filter(value => {
          return value.name.toLowerCase().includes(text.toLowerCase());
        });
        dispatch("updatePagination", {
          myJson: values,
          currentPage: 1,
          perPage: 3
        });
      } catch (err) {
        console.log("Error: ", this.values);
      }
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
    },
    showSpinner(state) {
      return state.showSpinner;
    }
  },
  modules: {}
});
