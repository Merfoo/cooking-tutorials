import { database } from '@/assets/js/firebase/index';

export default {
  create(title, content, userId) {
    const ref = database.ref();
    const userQuery = ref.child(`users/${userId}/recipesMade`).push();
    const recipeQuery = ref.child('recipes').push();
    const titleQuery = ref.child('recipeTitles').push();
    const contentQuery = ref.child('recipeContents').push();

    userQuery.set({
      recipe: recipeQuery.key,
    });

    recipeQuery.set({
      title: titleQuery.key,
      content: contentQuery.key,
      userId,
    });

    titleQuery.set({
      title,
      recipe: recipeQuery.key,
    });

    contentQuery.set({
      content,
      recipe: recipeQuery.key,
    });
  },
};
