<template>
  <div class="container">
      <h2>Featured Recipes</h2>
      <div class="row">
        <div class="col-md-6 recipe-container" v-for="recipeKey in recipeKeys">
          <RecipeCard class="recipe" :recipeKey="recipeKey" :key="recipeKey"></RecipeCard>
        </div>
     </div>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';
import RecipeCard from '@/components/RecipeCard';

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

    document.title = 'Home - Cooking Tutorials';
  },
  components: {
    RecipeCard,
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
