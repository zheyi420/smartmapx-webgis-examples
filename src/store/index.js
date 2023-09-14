import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scenario: {},
    mapCode: '',
    isRunCode: false,
  },
  getters: {
  },
  mutations: {
    SET_SCENARIO: (state, scenario) => {
      state.scenario = {...scenario};
    },
    SET_MAP_CODE: (state, mapCode) => {
      state.mapCode = mapCode;
    },
    SET_RUN_CODE: (state, isRunCode) => {
      state.isRunCode = isRunCode;
    }
  },
  actions: {
  },
  modules: {
  }
})
