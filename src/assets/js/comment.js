import { firebase, database } from '@/assets/js/firebase/index';

export default {
  create(userId, username, content, recipeKey) {
    const ref = database.ref();

    const commentKey = ref.child(`recipeComments/${recipeKey}`).push({
      userId,
      username,
      content,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    }).key;

    ref.child(`userComments/${userId}/${commentKey}`).set({
      recipeKey,
    });
  },
  get(recipeKey, commentKey) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child(`recipeComments/${recipeKey}/${commentKey}`).once('value').then((commentData) => {
        const commentDataVal = commentData.val();

        resolve({
          username: commentDataVal.username,
          content: commentDataVal.content,
        });
      }, (error) => {
        reject(error);
      });
    });
  },
};
