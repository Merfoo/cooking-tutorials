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
    <p>
      To create a recipe enter in all the information below. Recipes must have a title, description, instructions, ingredients, thumbnail, and images!
    </p>
    <form @submit.prevent="create">
      <fieldset>
        <div class="form-group">
          <label for="new-recipe-title">Title</label>
          <input class="form-control" type="text" name="new-recipe-title" v-model="recipe.title" required/>
        </div>
        <div class="form-group">
          <label for="recipe-description">Description</label>
          <input class="form-control" type="text" name="recipe-description" v-model="recipe.description" required/>
        </div>
        <div class="form-group">
          <label for="new-recipe-instructions">Instructions</label>
          <textarea class="form-control" type="textarea" name="new-recipe-instructions" v-model="recipe.instructions" rows="7" required/>
        </div>
      </fieldset>
      <fieldset>
        <IngredientListInput :ingredients="recipe.ingredients" @addIngredient="addIngredient" @removeIngredient="removeIngredient" @updateIngredient="updateIngredient"></IngredientListInput>
        <ThumbnailInput :thumbnailFile.sync="recipe.thumbnailFile"></ThumbnailInput>
        <ImageListInput :imageFiles="recipe.imageFiles" :imageCaptions="recipe.imageCaptions" @addImageFile="addImageFile" @removeImageFile="removeImageFile" @updateImageFile="updateImageFile" @updateImageCaption="updateImageCaption"></ImageListInput>
      </fieldset>
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
      recipe: {
        userId: this.$store.getters.user.uid,
        username: this.$store.getters.user.displayName,
        title: '',
        description: '',
        instructions: '',
        ingredients: [''],
        thumbnailFile: null,
        imageFiles: [null],
        imageCaptions: [''],
      },
      successMessage: '',
      errorMessage: '',
      showLoader: false,
    };
  },
  methods: {
    create() {
      if (recipe.isValid(this.recipe)) {
        this.showLoader = true;

        recipe.create(this.recipe).then(() => {
          this.showLoader = false;
          this.successMessage = `Recipe "${this.recipe.title}" created!`;
          this.errorMessage = '';
          this.resetForm();
        }, (error) => {
          this.showLoader = false;
          this.successMessage = '';
          this.errorMessage = error;
        });
      }

      else {
        this.errorMessage = 'Recipes must include a title, description, instructions, ingredients, thumbnail, and images!';
      }
    },
    resetForm() {
      this.recipe.title = '';
      this.recipe.description = '';
      this.recipe.instructions = '';
      this.recipe.ingredients = [];
      this.recipe.thumbnailFile = null;
      this.recipe.imageFiles = [];
      this.recipe.imageCaptions = [];
    },
    addIngredient(value) {
      this.recipe.ingredients.push(value);
    },
    removeIngredient(index) {
      // NOTE: When setting elements in an array, arr[index] = 0,
      // you must call a function like splice so that vuejs can register
      // the change event
      this.recipe.ingredients.splice(index, 1);
    },
    updateIngredient(index, value) {
      this.recipe.ingredients.splice(index, 1, value);
    },
    addImageFile(file) {
      this.recipe.imageFiles.push(file);
      this.recipe.imageCaptions.push('');
    },
    removeImageFile(index) {
      this.recipe.imageFiles.splice(index, 1);
      this.recipe.imageCaptions.splice(index, 1);
    },
    updateImageFile(index, file) {
      this.recipe.imageFiles.splice(index, 1, file);
    },
    updateImageCaption(index, value) {
      this.recipe.imageCaptions.splice(index, 1, value);
    },
  },
  components: {
    IngredientListInput,
    ThumbnailInput,
    ImageListInput,
    Loader,
  },
  mounted() {
    document.title = 'Create Recipe - Cooking Tutorials';
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
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
