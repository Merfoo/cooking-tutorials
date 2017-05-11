import { database } from '@/assets/js/firebase/index';

export default {
  create(title, content, userId) {
    const ref = database.ref();
    const userQuery = ref.child(`users/${userId}/recipesMade`).push();
    const recipeQuery = ref.child('recipes').push();
    const titleQuery = ref.child('recipeTitles').push();
    const contentQuery = ref.child('recipeContents').push();

    userQuery.set({
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
};
