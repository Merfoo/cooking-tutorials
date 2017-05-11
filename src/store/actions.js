import * as types from './mutation-types';

/* eslint-disable */
export const setUser = ({ commit }, user) => {
  commit(types.SET_USER, user);
};
