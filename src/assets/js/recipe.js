import { database } from '@/assets/js/firebase/index';

export default {
  create(title, content, userId) {
    const ref = database.ref();
    const userQuery = ref.child(`users/${userId}/recipesMade`).push();
    const recipeKeyQuery = ref.child('recipeKeys').push();
    const recipeQuery = ref.child('recipes').push();
    const titleQuery = ref.child('recipeTitles').push();
    const contentQuery = ref.child('recipeContents').push();

    userQuery.set({
      recipeKey: recipeQuery.key,
    });

    recipeKeyQuery.set({
      recipeKey: recipeQuery.key,
    });

    recipeQuery.set({
      titleKey: titleQuery.key,
      contentKey: contentQuery.key,
      userId,
    });

    titleQuery.set({
      title,
      recipeKey: recipeQuery.key,
    });

    contentQuery.set({
      content,
      recipeKey: recipeQuery.key,
    });
  },
  get(recipeKey) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child(`recipes/${recipeKey}`).once('value').then((recipeData) => {
        const recipe = recipeData.val();
        const titlePromise = ref.child(`recipeTitles/${recipe.titleKey}`).once('value');
        const contentPromise = ref.child(`recipeContents/${recipe.contentKey}`).once('value');

        Promise.all([titlePromise, contentPromise]).then((data) => {
          resolve({
            title: data[0].val().title,
            content: data[1].val().content,
          });
        }, (error) => {
          console.log(error);
          reject({
            title: 'Error',
            content: 'Error',
          });
        });
      }, (error) => {
        console.log(error);
        reject({
          title: 'Error',
          content: 'Error',
        });
      });
    });
  },
  getTitle(recipeKey) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child(`recipes/${recipeKey}/titleKey`).once('value').then((titleKeyData) => {
        ref.child(`recipeTitles/${titleKeyData.val()}`).once('value').then((titleData) => {
          resolve({
            title: titleData.val().title,
          });
        });
      }, (error) => {
        console.log(error);
        reject({
          title: 'Error',
        });
      });
    });
  },
  getLatestRecipes() {
    return new Promise((resolve, reject) => {
      const ref = database.ref();

      ref.child('recipeKeys').limitToLast(5).once('value').then((recipeDatas) => {
        const recipes = [];
        const recipeDatasVal = recipeDatas.val();

        Object.keys(recipeDatasVal).forEach((key) => {
          recipes.push(recipeDatasVal[key].recipeKey);
        });

        resolve(recipes);
      }, (error) => {
        console.log(error);
        reject([]);
      });
    });
  },
};
