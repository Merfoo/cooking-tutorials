// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-awesome/icons';

import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import attachAuthHandler from './assets/js/firebase/authHandler';

sync(store, router);
require('./assets/css/main.css');

Vue.config.productionTip = false;

Promise.all([attachAuthHandler()]).then(() => {
/* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
  });
}, (err) => {
  /* eslint-disable no-console */
  console.log(err);
});
