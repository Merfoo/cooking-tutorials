import { firebase, database, storage } from '@/assets/js/firebase/index';

export default {
  create(user, recipe) {
    const ref = database.ref();
    const storageRef = storage.ref();

    const recipeKey = ref.child('recipes').push({
      userId: user.id,
      username: user.username,
      title: recipe.title,
      description: recipe.description,
      thumbnailUrl: null,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    }).key;

    ref.child(`recipeData/${recipeKey}`).set({
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      imageCaptions: recipe.imageCaptions,
      imageUrls: [],
    });

    ref.child(`userRecipes/${user.id}/${recipeKey}`).set({ recipeKey });

    if (recipe.thumbnailFile) {
      const thumbnailFilename = recipe.thumbnailFile.name;
      const uploadTask = storageRef.child(`${user.id}/${recipeKey}/thumbnails/${thumbnailFilename}`).put(recipe.thumbnailFile);

      ref.child(`recipeThumbnailFilenames/${recipeKey}`).set({ thumbnailFilename });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, null, () => {
        ref.child(`recipes/${recipeKey}`).update({
          thumbnailUrl: uploadTask.snapshot.downloadURL,
        });
      });
    }

    if (recipe.imageFiles.length > 0) {
      const imageFilenames = [];
      const uploadPromises = [];

      for (let imageIndex = 0; imageIndex < recipe.imageFiles.length; imageIndex++) {
        const imageFile = recipe.imageFiles[imageIndex];
        const imageFilename = `${Date.now()}-${imageFile.name}`;
        const uploadTask = storageRef.child(`${user.id}/${recipeKey}/images/${imageFilename}`).put(imageFile);

        imageFilenames.push(imageFilename);

        uploadPromises.push(new Promise((resolve, reject) => {
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (error) => {
            reject(error);
          }, () => {
            resolve(uploadTask.snapshot.downloadURL);
          });
        }));
      }

      ref.child(`recipeImageFilenames/${recipeKey}`).set({
        imageFilenames,
      });

      Promise.all(uploadPromises).then((imageUrls) => {
        ref.child(`recipeData/${recipeKey}`).update({ imageUrls });
      });
    }
  },
  get(recipeKey) {
    return new Promise((resolve, reject) => {
      database.ref().child(`recipes/${recipeKey}`).once('value').then((recipe) => {
        resolve(recipe.val());
      }, (error) => {
        reject(error);
      });
    });
  },
  getData(recipeKey) {
    return new Promise((resolve, reject) => {
      database.ref().child(`recipeData/${recipeKey}`).once('value').then((recipeData) => {
        resolve(recipeData.val());
      }, (error) => {
        reject(error);
      });
    });
  },
  getLatestRecipes() {
    return new Promise((resolve, reject) => {
      database.ref().child('recipes').limitToLast(10).once('value')
      .then((recipeData) => {
        const recipes = [];
        const recipesVal = recipeData.val();

        if (recipesVal) {
          Object.keys(recipesVal).forEach((key) => {
            recipes.push(key);
          });
        }

        resolve(recipes);
      }, (error) => {
        reject(error);
      });
    });
  },
  watchComments(recipeKey, callback) {
    database.ref().child(`recipeComments/${recipeKey}`).on('value', (snapshot) => {
      let comments = snapshot.val();

      if (comments === null) {
        comments = {};
      }

      callback(comments);
    });
  },
  unwatchComments(recipeKey) {
    // NOTE: This will remove all callbacks for the 'value' event
    // since no callback was specified in "off"
    database.ref().child(`recipeComments/${recipeKey}`).off('value');
  },
};
