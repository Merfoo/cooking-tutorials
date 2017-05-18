<template>
  <div class="container">
      <h4>Featured Recipes</h4>
      <div class="row">
        <div class="col-md-6 recipe-container" v-for="recipeKey in recipeKeys">
          <FeaturedRecipe class="recipe" :recipeKey="recipeKey" :key="recipeKey">Hello</FeaturedRecipe>
        </div>
     </div>
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

<style scoped>
.recipe-container {
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
}

.recipe {
  height: 100%;
}
</style>
