<template>
  <div class="card">
    <div class="card-block">
      <img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="thumbnailAlt" class="recipe-img img-thumbnail float-right">
      <h4 class="card-title">{{ title }}</h4>
      <router-link :to="userLink" class="card-subtitle">{{ username }}</router-link>
      <p class="card-text">{{ description }}</p>
      <router-link :to="recipeLink" class="btn btn-primary router-button">View Recipe</router-link>
    </div>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';

export default {
  name: 'recipe-card',
  props: ['recipeKey'],
  data() {
    return {
      userId: '',
      username: '',
      title: '',
      description: '',
      thumbnailUrl: '',
      createdAt: '',
    };
  },
  mounted() {
    recipe.get(this.recipeKey).then((recipeData) => {
      this.userId = recipeData.userId;
      this.username = recipeData.username;
      this.title = recipeData.title;
      this.description = recipeData.description;
      this.thumbnailUrl = recipeData.thumbnailUrl;
      this.createdAt = recipeData.createdAt;
    });
  },
  computed: {
    userLink() {
      return `/user/${this.userId}`;
    },
    recipeLink() {
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
</style>
