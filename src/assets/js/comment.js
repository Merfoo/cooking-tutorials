import { database } from '@/assets/js/firebase/index';

export default {
  create(username, content, recipeKey) {
    const ref = database.ref();

    ref.child(`recipeComments/${recipeKey}`).push({
      username,
      content,
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
        console.log(error);
        reject(error);
      });
    });
  },
};
