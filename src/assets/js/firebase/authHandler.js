import store from '@/store';
import router from '@/router';
import user from '@/assets/js/user';
import { firebase } from './index';

const attachAuthHandler = () => new Promise((resolve, reject) => {
  let attached = false;

  firebase.auth().onAuthStateChanged((newUser) => {
    const curUser = store.getters.user;

    // New user signed in
    if (newUser && (curUser === null || curUser.uid !== newUser.uid)) {
      store.dispatch('setUser', newUser);

      user.exists(newUser.uid).then((exists) => {
        if (!exists) {
          user.create(newUser.uid, newUser.displayName, newUser.photoURL);
        }
      });
    }

    // User signed out
    else if (newUser === null && curUser) {
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
