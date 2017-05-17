<template>
  <div class="form-group">
    <p>Ingredients</p>
    <div class="input-group" v-for="(ingredient, index) in ingredients">
      <input v-model="ingredients[index]" class="form-control" type="text"/>
      <span class="input-group-btn">
        <button class="btn btn-danger" type="button" @click="removeIngredient(index)">Remove</button>
      </span>
    </div>
    <button class="btn btn-secondary" type="button" @click="addIngredient">Add</button>
  </div>
</template>

<script>
export default {
  name: 'ingredient-list',
  props: [
    'ingredients',
  ],
  methods: {
    addIngredient() {
      this.ingredients.push('');
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.input-group {
  margin: 5px 0;
}
</style>
