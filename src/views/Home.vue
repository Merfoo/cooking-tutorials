<template>
  <div class="container">
      <h4>Featured Recipes</h4>
      <FeaturedRecipe v-for="recipeKey in recipeKeys" :recipeKey="recipeKey" :key="recipeKey">Hello</FeaturedRecipe>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';
import FeaturedRecipe from '@/components/FeaturedRecipe';

export default {
  name: 'home',
  data() {
    return {
      recipeKeys: [],
    };
  },
  mounted() {
    recipe.getLatestRecipes().then((recipeKeys) => {
      this.recipeKeys = recipeKeys;
    });
  },
  components: {
    FeaturedRecipe,
  },
};
</script>
