<template>
  <div class="create">
    <h2>Create</h2>
    <form class="create-form" @submit.prevent="create">
      <label for="new-recipe-title">Title</label>
      <input type="text" name="new-recipe-title" v-model="title" required/>

      <label for="new-recipe-content">Content</label>
      <textarea type="textarea" name="new-recipe-content" v-model="content" required/>

      <br/>
      <input type="submit" value="Create"/>
    </form>
  </div>
</template>

<script>
import recipe from '@/assets/js/recipe';

export default {
  name: 'create',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    create() {
      recipe.create(this.title, this.title, this.$store.getters.user.uid);
      this.title = '';
      this.content = '';
    },
  },
};
</script>

<style>
.create-form label {
  display: block;
  margin-bottom: 5px;
}
</style>
