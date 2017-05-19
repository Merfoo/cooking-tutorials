import { database, storage } from '@/assets/js/firebase/index';

export default {
  create(userId, title, content, ingredients, thumbnailFile, images, imageCaptions) {
    const ref = database.ref();
    const storageRef = storage.ref();
    const recipeKey = ref.child('recipes').push({ userId }).key;
    const filteredIngredients = ingredients.filter(entry => /\S/.test(entry));

    ref.child(`recipeTitles/${recipeKey}`).set({ title });
    ref.child(`recipeContents/${recipeKey}`).set({ content });
    ref.child(`recipeIngredients/${recipeKey}`).set({ ingredients: filteredIngredients });
    ref.child(`users/${userId}/recipesMade/${recipeKey}`).set({ recipeKey });

    if (thumbnailFile) {
      storageRef.child(`${recipeKey}/thumbnail.jpg`).put(thumbnailFile);
    }

    const imageFilenames = [];
    const validImageCaptions = [];

    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      const image = images[imageIndex];

      if (image) {
        const filename = `${Date.now()}-${image.name}`;

        imageFilenames.push(filename);
        validImageCaptions.push(imageCaptions[imageIndex]);
        storageRef.child(`${recipeKey}/images/${filename}`).put(image);
      }
    }

    if (imageFilenames.length > 0) {
      ref.child(`recipeImageFilenames/${recipeKey}`).set({ imageFilenames });
      ref.child(`recipeImageCaptions/${recipeKey}`).set({ imageCaptions: validImageCaptions });
    }
  },
  get(recipeKey) {
    return new Promise((resolve, reject) => {
      const ref = database.ref();
      const titlePromise = ref.child(`recipeTitles/${recipeKey}`).once('value');
      const contentPromise = ref.child(`recipeContents/${recipeKey}`).once('value');
      const ingredientsPromise = ref.child(`recipeIngredients/${recipeKey}`).once('value');

      Promise.all([titlePromise, contentPromise, ingredientsPromise]).then((recipeData) => {
        let ingredients = recipeData[2].val();

        if (ingredients) {
          ingredients = ingredients.ingredients;
        } else {
          ingredients = [];
        }

        resolve({
          title: recipeData[0].val().title,
          content: recipeData[1].val().content,
          ingredients,
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
        resolve(titleData.val().title);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  getThumbnailUrl(recipeKey) {
    return new Promise((resolve) => {
      storage.ref().child(`${recipeKey}/thumbnail.jpg`).getDownloadURL().then((url) => {
        resolve(url);
      })
      .catch(() => {
        resolve(null);
      });
    });
  },
  getImageUrls(recipeKey) {
    return new Promise((resolve) => {
      database.ref().child(`recipeImageFilenames/${recipeKey}`).once('value').then((imageFilenamesData) => {
        const imageFilenames = imageFilenamesData.val().imageFilenames;
        const promises = [];

        for (let filenameIndex = 0; filenameIndex < imageFilenames.length; filenameIndex++) {
          promises.push(storage.ref().child(`${recipeKey}/images/${imageFilenames[filenameIndex]}`).getDownloadURL());
        }

        Promise.all(promises).then((urls) => {
          resolve(urls);
        });
      });
    });
  },
  getImageCaptions(recipeKey) {
    return new Promise((resolve, reject) => {
      database.ref().child(`recipeImageCaptions/${recipeKey}`).once('value').then((imageCaptionsData) => {
        resolve(imageCaptionsData.val().imageCaptions);
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
