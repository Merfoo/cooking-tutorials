<template>
  <div class="card">
    <div class="card-block">
      <router-link :to="userLink">{{ username }}</router-link>
      <p class="card-text">{{ commentDate }}</p>
      <p class="card-text">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'comment',
  props: ['comment'],
  computed: {
    userLink() {
      return `/user/${this.comment.userId}`;
    },
    username() {
      return this.comment.username;
    },
    content() {
      return this.comment.content;
    },
    commentDate() {
      return `${moment(this.createdAt).format('MMM Do YYYY, h:mm a')}`;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 5px;
}
</style>
