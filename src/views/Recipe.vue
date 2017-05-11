<template>
  <div class="recipe">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
import { database } from '@/assets/js/firebase/index';

export default {
  name: 'recipe',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    update(recipeId) {
      const ref = database.ref();

      ref.child(`recipes/${recipeId}`).once('value').then((recipeData) => {
        const recipe = recipeData.val();

        ref.child(`recipeTitles/${recipe.titleKey}`).once('value').then((titleData) => {
          this.title = titleData.val().title;
        });

        ref.child(`recipeContents/${recipe.contentKey}`).once('value').then((contentData) => {
          this.content = contentData.val().content;
        });
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
