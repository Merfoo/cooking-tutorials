import store from '@/store';
import router from '@/router';
import { firebase } from './index';

const attachAuthHandler = () => new Promise((resolve, reject) => {
  let attached = false;

  firebase.auth().onAuthStateChanged((user) => {
    const curUser = store.getters.user;

    // New user signed in
    if (user && (curUser === null || curUser.uid !== user.uid)) {
      store.dispatch('setUser', user);
    }

    // User signed out
    else if (user === null && curUser) {
      store.dispatch('setUser', null);
      router.push({ path: '/' });
    }

    attached = true;
    resolve();
  });

  setTimeout(() => {
    if (!attached) {
      reject(new Error('Attachement of firebase auth failed!'));
    }
  }, 1000 * 60);
});

export default attachAuthHandler;
