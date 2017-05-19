<template>
  <div class="card">
    <div class="card-block">
      <img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="thumbnailAlt" class="recipe-img img-thumbnail float-right">
      <h5 class="card-title">{{ title }}</h5>
      <router-link :to="recipeUrl" class="btn btn-primary router-button">
        View Recipe
      </router-link>
    </div>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';

export default {
  name: 'featured-recipe',
  props: ['recipeKey'],
  data() {
    return {
      title: '',
      thumbnailUrl: null,
    };
  },
  mounted() {
    recipe.getTitle(this.recipeKey).then((title) => {
      this.title = title;
    });

    recipe.getThumbnailUrl(this.recipeKey).then((url) => {
      this.thumbnailUrl = url;
    });
  },
  computed: {
    recipeUrl() {
      return `/recipe/${this.recipeKey}`;
    },
    thumbnailAlt() {
      return `${this.title}'s thumbnail`;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}

.recipe-img {
  width: 125px;
  height: 125px;
}

.router-button {
  margin-top: 50px;
}
</style>
