<template>
  <div>
    <form v-if="signedIn" @submit.prevent="onSubmit">
      <div class="form-group">
        <textarea class="form-control" type="textarea" v-model="comment.content" placeholder="Comment..." required/>
      </div>
      <VueRecaptcha :sitekey="sitekey" ref="invisibleRecaptcha" size="invisible" @verify="onVerify"></VueRecaptcha>
      <button class="btn btn-primary" type="submit">Comment</button>
    </form>
    <button v-else class="btn btn-primary" @click="signIn">Sign in to comment!</button>
  </div>
</template>

<script>
/* global $ */

import VueRecaptcha from 'vue-recaptcha';
import comment from '@/assets/js/comment';

export default {
  name: 'create-comment',
  props: ['recipeKey'],
  data() {
    return {
      sitekey: '6LdaiSUUAAAAADe76eOE1iazt27CrYiB1hLnkpe5',
      comment: {
        userId: null,
        username: '',
        content: '',
      },
    };
  },
  components: {
    VueRecaptcha,
  },
  computed: {
    signedIn() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onSubmit() {
      this.$refs.invisibleRecaptcha.execute();
    },
    onVerify(recaptchaResponse) {
      $.post('/api/comment', {
        recaptchaResponse,
      }).done((data) => {
        if (data.success) {
          this.comment.userId = this.$store.getters.user.uid;
          this.comment.username = this.$store.getters.user.displayName;

          comment.create(this.comment, this.recipeKey).then(() => {
            this.comment.content = '';
          });
        }

        this.$refs.invisibleRecaptcha.reset();
      });
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
