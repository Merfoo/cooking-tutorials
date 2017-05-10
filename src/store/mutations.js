import * as types from './mutation-types';

export default {
  [types.SET_USER](state, user) {
    /* eslint-disable */
    state.user = user;
  },
};
