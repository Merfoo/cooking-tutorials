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
      <IngredientList :ingredients="ingredients"></IngredientList>
      <div class="form-group">
        <p>Thumbnail (125px by 125px)</p>
        <div>
          {{ thumbnailFilename }}
        </div>
        <label class="btn btn-secondary">
          Browse <input type="file" accept=".jpg" hidden @change="updateThumbnailFile">
        </label>
      </div>
      <ImageList :images="images"></ImageList>
      <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';
import IngredientList from '@/components/IngredientList';
import ImageList from '@/components/ImageList';

export default {
  name: 'create',
  data() {
    return {
      title: '',
      content: '',
      ingredients: [],
      thumbnailFilename: '',
      thumbnailFile: null,
      images: [],
    };
  },
  methods: {
    create() {
      recipe.create(
        this.$store.getters.user.uid,
        this.title,
        this.content,
        this.ingredients,
        this.thumbnailFile,
        this.images,
      );

      this.title = '';
      this.content = '';
      this.ingredients = [];
    },
    updateThumbnailFile(e) {
      this.thumbnailFilename = '';
      this.thumbnailFile = null;

      if (e.target.files.length > 0) {
        this.thumbnailFile = e.target.files[0];
        this.thumbnailFilename = this.thumbnailFile.name;
      }
    },
  },
  components: {
    IngredientList,
    ImageList,
  },
};
</script>
