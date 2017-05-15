<template>
  <div class="card">
    <div class="card-block">
      <h5 class="card-title">{{ title }}</h5>
      <router-link :to="url" class="btn btn-primary">
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
    };
  },
  mounted() {
    recipe.getTitle(this.recipeKey).then((recipeData) => {
      this.title = recipeData.title;
    });
  },
  computed: {
    url() {
      return `/recipe/${this.recipeKey}`;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
