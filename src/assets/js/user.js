import { firebase, database } from '@/assets/js/firebase/index';

export default {
  create(userId, username, profilePhotoUrl) {
    const ref = database.ref();

    ref.child(`users/${userId}`).set({
      userId,
      username,
      profilePhotoUrl,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  },
  get(userId) {
    return new Promise((resolve, reject) => {
      database.ref().child(`users/${userId}`).once('value').then((data) => {
        const dataVal = data.val();

        resolve({
          username: dataVal.username,
          profilePhotoUrl: dataVal.profilePhotoUrl,
          createdAt: dataVal.createdAt,
        });
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  exists(userId) {
    return new Promise((resolve, reject) => {
      database.ref().child(`users/${userId}`).once('value').then((data) => {
        resolve(!!data.val());
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
};
