<template>
  <div class="container">
    <Loader id="loader" :show="showLoader"></Loader>
    <div v-if="showLoader" class="faded"></div>
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <h2>Create</h2>
    <form @submit.prevent="create">
      <div class="form-group">
        <label for="new-recipe-title">Title</label>
        <input class="form-control" type="text" name="new-recipe-title" v-model="title" required/>
      </div>
      <div class="form-group">
        <label for="recipe-description">Description</label>
        <input class="form-control" type="text" name="recipe-description" v-model="description" required/>
      </div>
      <div class="form-group">
        <label for="new-recipe-instructions">Instructions</label>
        <textarea class="form-control" type="textarea" name="new-recipe-instructions" v-model="instructions" required/>
      </div>
      <IngredientListInput :ingredients="ingredients" @addIngredient="addIngredient" @removeIngredient="removeIngredient" @updateIngredient="updateIngredient"></IngredientListInput>
      <ThumbnailInput :thumbnailFile.sync="thumbnailFile"></ThumbnailInput>
      <ImageListInput :imageFiles="imageFiles" :imageCaptions="imageCaptions" @addImageFile="addImageFile" @removeImageFile="removeImageFile" @updateImageFile="updateImageFile" @updateImageCaption="updateImageCaption"></ImageListInput>
      <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';
import IngredientListInput from '@/components/IngredientListInput';
import ThumbnailInput from '@/components/ThumbnailInput';
import ImageListInput from '@/components/ImageListInput';
import Loader from '@/components/Loader';

export default {
  name: 'create',
  data() {
    return {
      title: '',
      description: '',
      instructions: '',
      ingredients: [],
      thumbnailFile: null,
      imageFiles: [],
      imageCaptions: [],
      successMessage: '',
      errorMessage: '',
      showLoader: false,
    };
  },
  methods: {
    create() {
      this.showLoader = true;

      recipe.create({
        id: this.$store.getters.user.uid,
        username: this.$store.getters.user.displayName,
      }, {
        title: this.title,
        description: this.description,
        instructions: this.instructions,
        ingredients: this.ingredients,
        thumbnailFile: this.thumbnailFile,
        imageFiles: this.imageFiles,
        imageCaptions: this.imageCaptions,
      }).then(() => {
        this.showLoader = false;
        this.successMessage = `Recipe "${this.title}" created!`;
        this.errorMessage = '';
        this.title = '';
        this.description = '';
        this.instructions = '';
        this.ingredients = [];
        this.thumbnailFile = null;
        this.imageFiles = [];
        this.imageCaptions = [];
      }, (error) => {
        this.showLoader = false;
        this.successMessage = '';
        this.errorMessage = error;
      });
    },
    addIngredient(value) {
      this.ingredients.push(value);
    },
    removeIngredient(index) {
      // NOTE: When setting elements in an array, arr[index] = 0,
      // you must call a function like splice so that vuejs can register
      // the change event
      this.ingredients.splice(index, 1);
    },
    updateIngredient(index, value) {
      this.ingredients.splice(index, 1, value);
    },
    addImageFile(file) {
      this.imageFiles.push(file);
      this.imageCaptions.push('');
    },
    removeImageFile(index) {
      this.imageFiles.splice(index, 1);
      this.imageCaptions.splice(index, 1);
    },
    updateImageFile(index, file) {
      this.imageFiles.splice(index, 1, file);
    },
    updateImageCaption(index, value) {
      this.imageCaptions.splice(index, 1, value);
    },
  },
  components: {
    IngredientListInput,
    ThumbnailInput,
    ImageListInput,
    Loader,
  },
};
</script>

<style scoped>
#loader {
  position: absolute;
  z-index: 1001;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin: -50px -50px;
}

.faded {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.85);
}
</style>
