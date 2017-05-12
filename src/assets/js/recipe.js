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

        Object.keys(recipeDatasVal).forEach((key) => {
          recipes.push(key);
        });

        resolve(recipes);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
};
