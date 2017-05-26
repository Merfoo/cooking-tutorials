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
    <div id="script-container">
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
    update(newRecipeKey, oldRecipeKey) {
      const recipePromise = recipe.get(newRecipeKey);
      const recipeDataPromise = recipe.getData(newRecipeKey);

      Promise.all([recipePromise, recipeDataPromise]).then((data) => {
        const $scriptContainer = document.getElementById('script-container');

        while ($scriptContainer.lastChild) {
          $scriptContainer.removeChild($scriptContainer.lastChild);
        }

        $scriptContainer.appendChild(recipe.createScript(data[0], data[1]));

        this.userId = data[0].userId;
        this.username = data[0].username;
        this.title = data[0].title;
        this.description = data[0].description;
        this.thumbnailUrl = data[0].thumbnailUrl;
        this.createdAt = data[0].createdAt;

        this.instructions = data[1].instructions;
        this.ingredients = data[1].ingredients;
        this.imageCaptions = data[1].imageCaptions;
        this.imageUrls = data[1].imageUrls;
      });

      if (oldRecipeKey) {
        recipe.unwatchComments(oldRecipeKey);
      }

      recipe.watchComments(newRecipeKey, (data) => {
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
