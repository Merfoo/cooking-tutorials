<template>
  <div class="recipe">
    <div class="container">
      <div class="recipe-container">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
      <div class="comments">
        <CreateComment :recipeKey="recipeKey"></CreateComment>
        <Comment v-for="comment in comments" :comment="comment"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';
import CreateComment from '@/components/CreateComment';
import Comment from '@/components/Comment';

export default {
  name: 'recipe',
  data() {
    return {
      title: '',
      content: '',
      comments: [],
    };
  },
  methods: {
    update(recipeKey, oldRecipeKey) {
      recipe.get(recipeKey).then((recipeData) => {
        this.title = recipeData.title;
        this.content = recipeData.content;
      });

      if (oldRecipeKey) {
        recipe.unwatchComments(oldRecipeKey);
      }

      recipe.watchComments(recipeKey, (data) => {
        this.comments = [];

        Object.keys(data).forEach((key) => {
          this.comments.push(data[key]);
        });
      });
    },
  },
  computed: {
    recipeKey() {
      return this.$route.params.id;
    },
  },
  components: {
    CreateComment,
    Comment,
  },
  beforeRouteUpdate(to, from, next) {
    this.update(to.params.id, from.params.id);
    next();
  },
  mounted() {
    this.update(this.recipeKey, null);
  },
  beforeDestroy() {
    recipe.unwatchComments(this.recipeKey);
  },
};
</script>

<style>
.recipe {
  display: flex;
  justify-content: center;
}

.recipe-container {
  margin-bottom: 10px;
}
</style>
