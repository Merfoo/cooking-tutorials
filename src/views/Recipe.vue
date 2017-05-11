<template>
  <div class="recipe">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';

export default {
  name: 'recipe',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    update(recipeKey) {
      recipe.get(recipeKey).then((recipeData) => {
        this.title = recipeData.title;
        this.content = recipeData.content;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.update(to.params.id);
    next();
  },
  mounted() {
    this.update(this.$route.params.id);
  },
};
</script>

<style>
</style>
