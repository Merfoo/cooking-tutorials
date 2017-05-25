<template>
  <div class="container">
    <h2>Create</h2>
    <form @submit.prevent="create">
      <div class="form-group">
        <label for="new-recipe-title">Title</label>
        <input class="form-control" type="text" name="new-recipe-title" v-model="title" required/>
      </div>
      <div class="form-group">
        <label for="new-recipe-content">Content</label>
        <textarea class="form-control" type="textarea" name="new-recipe-content" v-model="content" required/>
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

export default {
  name: 'create',
  data() {
    return {
      title: '',
      content: '',
      ingredients: [],
      thumbnailFile: null,
      imageFiles: [],
      imageCaptions: [],
    };
  },
  methods: {
    create() {
      recipe.create(
        this.$store.getters.user.uid,
        this.$store.getters.user.displayName,
        this.title,
        this.content,
        this.ingredients,
        this.thumbnailFile,
        this.imageFiles,
        this.imageCaptions,
      );

      this.title = '';
      this.content = '';
      this.ingredients = [];
      this.thumbnailFile = null;
      this.imageFiles = [];
      this.imageCaptions = [];
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
  },
};
</script>
