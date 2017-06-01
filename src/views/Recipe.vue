<template>
  <div class="container">
    <div class="recipe-container">
      <h2>{{ recipe.title }}</h2>
      <p>{{ recipe.description }}</p>
      <p>{{ recipe.instructions }}</p>
      <div class="ingredients-container">
        <h5>Ingredients</h5>
        <ul class="list-group">
          <li v-for="ingredient in recipe.ingredients" class="list-group-item">{{ ingredient }}</li>
        </ul>
      </div>
      <ImageCarousel :imageCaptions="recipe.imageCaptions" :imageUrls="recipe.imageUrls"></ImageCarousel>
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
      recipe: {},
      comments: [],
    };
  },
  methods: {
    update(newRecipeKey, oldRecipeKey) {
      const recipePromise = recipe.get(newRecipeKey);
      const recipeDataPromise = recipe.getData(newRecipeKey);

      Promise.all([recipePromise, recipeDataPromise]).then((data) => {
        this.recipe = Object.assign({}, data[0], data[1]);

        const $scriptContainer = document.getElementById('script-container');

        while ($scriptContainer.lastChild) {
          $scriptContainer.removeChild($scriptContainer.lastChild);
        }

        $scriptContainer.appendChild(recipe.createScript(this.recipe));
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
