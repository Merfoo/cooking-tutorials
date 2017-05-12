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
import comment from '@/assets/js/comment';
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
    update(recipeKey) {
      recipe.get(recipeKey).then((recipeData) => {
        this.title = recipeData.title;
        this.content = recipeData.content;
      });

      comment.getFirstComments(this.recipeKey, 5).then((comments) => {
        this.comments = comments;
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
    this.update(to.params.id);
    next();
  },
  mounted() {
    this.update(this.recipeKey);
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
