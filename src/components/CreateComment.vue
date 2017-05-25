<template>
  <div>
    <form v-if="signedIn" @submit.prevent="create">
      <div class="form-group">
        <textarea class="form-control" type="textarea" v-model="content" placeholder="Comment..." required/>
      </div>
      <button class="btn btn-primary" type="submit">Comment</button>
    </form>
    <button v-else class="btn btn-primary" @click="signIn">Sign in to comment!</button>
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
      comment.create(
        this.$store.getters.user.uid,
        this.$store.getters.user.displayName,
        this.content,
        this.recipeKey,
      );

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

<style scoped>
.create-comment-form textarea {
  width: 100%;
}
</style>
