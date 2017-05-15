<template>
  <div class="card">
    <div class="card-block">
      <h5 class="card-title">{{ username }}</h5>
      <p class="card-text">{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: ['comment'],
  computed: {
    username() {
      return this.comment.username;
    },
    content() {
      return this.comment.content;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 5px;
}
</style>
