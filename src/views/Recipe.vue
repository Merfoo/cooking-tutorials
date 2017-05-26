<template>
  <div class="container">
    <div class="recipe-container">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <p>{{ instructions }}</p>
      <div class="ingredients-container">
        <h5>Ingredients</h5>
        <ul class="list-group">
          <li v-for="ingredient in ingredients" class="list-group-item">{{ ingredient }}</li>
        </ul>
      </div>
      <ImageCarousel :imageCaptions="imageCaptions" :imageUrls="imageUrls"></ImageCarousel>
    </div>
    <div class="comments">
      <h5>Comments</h5>
      <CreateComment :recipeKey="recipeKey" class="create-comment"></CreateComment>
      <Comment v-for="comment in comments" :comment="comment" :key="comment"></Comment>
    </div>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';
import ImageCarousel from '@/components/ImageCarousel';
import CreateComment from '@/components/CreateComment';
import Comment from '@/components/Comment';

export default {
  name: 'recipe',
  data() {
    return {
      userId: '',
      username: '',
      title: '',
      description: '',
      thumbnailUrl: '',
      createdAt: '',
      instructions: '',
      ingredients: [],
      imageCaptions: [],
      imageUrls: [],
      comments: [],
    };
  },
  methods: {
    update(recipeKey, oldRecipeKey) {
      recipe.get(this.recipeKey).then((recipeData) => {
        this.userId = recipeData.userId;
        this.username = recipeData.username;
        this.title = recipeData.title;
        this.description = recipeData.description;
        this.thumbnailUrl = recipeData.thumbnailUrl;
        this.createdAt = recipeData.createdAt;
      });

      recipe.getData(recipeKey).then((recipeData) => {
        this.instructions = recipeData.instructions;
        this.ingredients = recipeData.ingredients;
        this.imageCaptions = recipeData.imageCaptions;
        this.imageUrls = recipeData.imageUrls;
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
    ImageCarousel,
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

<style scoped>
.create-comment {
  margin-bottom: 10px;
}

.list-group-item {
  margin-bottom: 5px;
}

.ingredients-container {
  margin-bottom: 5px;
}
</style>
