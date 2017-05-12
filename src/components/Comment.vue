<template>
  <div class="comment">
    <p>{{ username }}</p>
    <p>{{ content }}</p>
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

<style>
.comment {
  padding: 1px 10px;
  margin: 10px 0;
  background: lightgrey;
  border-radius: 1px;
}
</style>
