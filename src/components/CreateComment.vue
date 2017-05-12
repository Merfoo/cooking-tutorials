<template>
  <div class="create-comment">
    <form v-if="signedIn"class="create-comment-form" @submit.prevent="create">
      <textarea type="textarea" name="create-comment-content" v-model="content" placeholder="Comment..." required/>
      <br/>
      <input type="submit" value="Comment"/>
    </form>
    <button v-else @click="signIn">Sign in to comment!</button>
  </div>
</template>

<script>
import comment from '@/assets/js/comment';

export default {
  name: 'create-comment',
  props: ['recipeKey'],
  data() {
    return {
      content: '',
    };
  },
  computed: {
    signedIn() {
      return this.$store.getters.user;
    },
  },
  methods: {
    create() {
      comment.create(this.$store.getters.user.displayName, this.content, this.recipeKey);
      this.content = '';
    },
    signIn() {
      this.$router.push({
        name: 'Login',
        query: {
          redirect: this.$router.currentRoute.path,
        },
      });
    },
  },
};
</script>

<style>
.create-comment-form textarea {
  width: 100%;
}
</style>
