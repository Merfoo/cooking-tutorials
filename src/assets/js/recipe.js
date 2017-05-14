import { database } from '@/assets/js/firebase/index';

export default {
  create(title, content, userId) {
    const ref = database.ref();
    const recipeKey = ref.child('recipes').push({ userId }).key;

    ref.child(`recipeTitles/${recipeKey}`).set({ title });
    ref.child(`recipeContents/${recipeKey}`).set({ content });
    ref.child(`users/${userId}/recipesMade/${recipeKey}`).set({ recipeKey });
  },
  get(recipeKey) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();
      const titlePromise = ref.child(`recipeTitles/${recipeKey}`).once('value');
      const contentPromise = ref.child(`recipeContents/${recipeKey}`).once('value');

      Promise.all([titlePromise, contentPromise]).then((recipeData) => {
        resolve({
          title: recipeData[0].val().title,
          content: recipeData[1].val().content,
        });
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  getTitle(recipeKey) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child(`recipeTitles/${recipeKey}`).once('value').then((titleData) => {
        resolve({
          title: titleData.val().title,
        });
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  getLatestRecipes() {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child('recipes').limitToLast(5).once('value').then((recipeDatas) => {
        const recipes = [];
        const recipeDatasVal = recipeDatas.val();

        if (recipeDatasVal) {
          Object.keys(recipeDatasVal).forEach((key) => {
            recipes.push(key);
          });
        }

        resolve(recipes);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  getFirstComments(recipeKey, count) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child(`recipeComments/${recipeKey}`).limitToFirst(count).once('value').then((commentDatas) => {
        const comments = [];
        const commentDatasVal = commentDatas.val();

        if (commentDatasVal) {
          Object.keys(commentDatasVal).forEach((key) => {
            comments.push(commentDatasVal[key]);
          });
        }

        resolve(comments);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  watchComments(recipeKey, callback) {
    database.ref().child(`recipeComments/${recipeKey}`).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  },
  unwatchComments(recipeKey) {
    // NOTE: This will remove all callbacks for the 'value' event
    // since no callback was specified in "off"
    database.ref().child(`recipeComments/${recipeKey}`).off('value');
  },
};
