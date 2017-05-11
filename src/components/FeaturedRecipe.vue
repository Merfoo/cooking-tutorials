<template>
  <div class="featured-recipe" @click="click">
    <h2>{{ title }}</h2>
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
  methods: {
    click() {
      this.$router.push(`/recipe/${this.recipeKey}`);
    },
  },
};
</script>

<style>
.featured-recipe {
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
}

.featured-recipe:hover {
  background-color: grey;
  cursor: pointer;
}
</style>
