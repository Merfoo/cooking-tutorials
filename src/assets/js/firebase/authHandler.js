import { firebase } from './index';

const attachAuthHandler = () => new Promise((resolve, reject) => {
  let attached = false;

  firebase.auth.onAuthStateChanged(() => {
    attached = true;
    resolve();
  });

  setTimeout(() => {
    if (!attached) {
      reject(new Error('Attachement of firebase auth failed!'));
    }
  });
});

export default attachAuthHandler;
