<template>
  <div class="form-group">
    <p>Ingredients</p>
    <div class="input-group" v-for="(ingredient, index) in ingredients">
      <input :value="ingredients[index]" @input="updateIngredient(index, $event.target.value)" class="form-control" type="text"/>
      <span class="input-group-btn">
        <button class="btn btn-danger" type="button" @click="removeIngredient(index)">Remove</button>
      </span>
    </div>
    <button class="btn btn-secondary" type="button" @click="addIngredient">Add</button>
  </div>
</template>

<script>
export default {
  name: 'ingredient-list-input',
  props: [
    'ingredients',
  ],
  methods: {
    addIngredient() {
      this.$emit('addIngredient', '');
    },
    removeIngredient(index) {
      this.$emit('removeIngredient', index);
    },
    updateIngredient(index, value) {
      this.$emit('updateIngredient', index, value);
    },
  },
};
</script>

<style scoped>
.input-group {
  margin: 5px 0;
}
</style>
