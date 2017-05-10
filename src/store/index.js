import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  user: null,
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
