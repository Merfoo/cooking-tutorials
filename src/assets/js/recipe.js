import moment from 'moment';
import shortid from 'shortid';
import { firebase, database, storage } from '@/assets/js/firebase/index';

// Removes empty ingredients, empty image file and corresponding image captions
function removeEmptyEntries(recipe) {
  recipe.ingredients = recipe.ingredients.filter(entry => /\S/.test(entry));

  for (let index = 0; index < recipe.imageFiles.length; index++) {
    if (!recipe.imageFiles[index]) {
      recipe.imageFiles.splice(index, 1);
      recipe.imageCaptions.splice(index, 1);
      index -= 1;
    }
  }
}

export default {
  create(recipe) {
    return new Promise((resolveCreate, rejectCreate) => {
      removeEmptyEntries(recipe);
      const ref = database.ref();
      const storageRef = storage.ref();
      const recipeKey = shortid.generate();

      const createSuccessHandler = () => {
        resolveCreate();
      };

      const createErrorHandler = (error) => {
        if (recipeKey) {
          ref.child(`recipes/${recipeKey}`).remove();
          ref.child(`recipeThumbnailFilenames/${recipeKey}`).remove();
          ref.child(`recipeData/${recipeKey}`).remove();
          ref.child(`recipeImageFilenames/${recipeKey}`).remove();
          ref.child(`userRecipes/${recipe.userId}`).remove();
        }

        rejectCreate(error);
      };

      // Create entry in user recipes with recipe key
      ref.child(`userRecipes/${recipe.userId}/${recipeKey}`).set({ userId: recipe.userId }).then(() => {
        const createPromises = [];

        // Create recipe entry
        createPromises.push(new Promise((resolveRecipe, rejectRecipe) => {
          ref.child(`recipes/${recipeKey}`).set({
            userId: recipe.userId,
            username: recipe.username,
            title: recipe.title,
            description: recipe.description,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          }).then(resolveRecipe, rejectRecipe);
        }));

        // Create recipe thumbnail filename entry, update recipe thumbnail file url entry
        createPromises.push(new Promise((resolveThumbnail, rejectThumbnail) => {
          const thumbnailFilename = recipe.thumbnailFile.name;
          const uploadTask = storageRef.child(`${recipe.userId}/${recipeKey}/thumbnails/${thumbnailFilename}`).put(recipe.thumbnailFile);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (error) => {
            rejectThumbnail(error);
          }, () => {
            const thumbnailPromises = [];

            thumbnailPromises.push(ref.child(`recipes/${recipeKey}`).update({ thumbnailUrl: uploadTask.snapshot.downloadURL }));
            thumbnailPromises.push(ref.child(`recipeThumbnailFilenames/${recipeKey}`).update({ thumbnailFilename }));
            Promise.all(thumbnailPromises).then(resolveThumbnail, rejectThumbnail);
          });
        }));

        // Create recipe data entry
        createPromises.push(new Promise((resolveRecipeData, rejectRecipeData) => {
          ref.child(`recipeData/${recipeKey}`).set({
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            imageCaptions: recipe.imageCaptions,
          }).then(resolveRecipeData, rejectRecipeData);
        }));

        // Create recipe image filename entry, update recipe data image files urls
        createPromises.push(new Promise((resolveImageFiles, rejectImageFiles) => {
          const imageFilenames = [];
          const uploadPromises = [];

          for (let imageIndex = 0; imageIndex < recipe.imageFiles.length; imageIndex++) {
            const imageFile = recipe.imageFiles[imageIndex];
            const imageFilename = `${Date.now()}-${imageFile.name}`;
            const uploadTask = storageRef.child(`${recipe.userId}/${recipeKey}/images/${imageFilename}`).put(imageFile);

            imageFilenames.push(imageFilename);

            uploadPromises.push(new Promise((resolveUpload, rejectUpload) => {
              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (error) => {
                rejectUpload(error);
              }, () => {
                resolveUpload(uploadTask.snapshot.downloadURL);
              });
            }));
          }

          Promise.all(uploadPromises).then((imageUrls) => {
            const recipePromises = [];

            recipePromises.push(ref.child(`recipeData/${recipeKey}`).update({ imageUrls }));
            recipePromises.push(ref.child(`recipeImageFilenames/${recipeKey}`).update({ imageFilenames }));
            Promise.all(recipePromises).then(resolveImageFiles, rejectImageFiles);
          });
        }));

        Promise.all(createPromises).then(createSuccessHandler, createErrorHandler);
      }, createErrorHandler);
    });
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
  createScript(recipe) {
    const $script = document.createElement('script');

    $script.setAttribute('type', 'application/ld+json');
    $script.text = JSON.stringify({
      '@context': 'http://schema.org/',
      '@type': 'Recipe',
      name: recipe.title,
      image: recipe.thumbnailUrl,
      author: {
        '@type': 'Person',
        name: recipe.username,
      },
      datePublished: moment(recipe.createdAt).format('MMM Do YYYY'),
      description: recipe.description,
      recipeIngredient: recipe.ingredients,
      recipeInstructions: recipe.instructions,
    });

    return $script;
  },
  isValid(recipe) {
    const ingredients = recipe.ingredients.filter(ingredient => /\S/.test(ingredient));

    if (ingredients.length === 0) {
      return false;
    }

    if (!recipe.thumbnailFile) {
      return false;
    }

    let validImageFiles = false;

    for (let index = 0; index < recipe.imageFiles.length; index++) {
      if (recipe.imageFiles[index]) {
        validImageFiles = true;
        break;
      }
    }

    if (!validImageFiles) {
      return false;
    }

    return true;
  },
};
