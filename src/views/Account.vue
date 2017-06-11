<template>
  <div class="container">
    <div class="card">
      <img class="card-img-top" :src="userImgSrc" :alt="userImgAlt">
      <div class="card-block">
        <h4 class="card-title">{{ username }}</h4>
        <p class="card-text">{{ userEmail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  computed: {
    userImgSrc() {
      return this.$store.getters.user.photoURL;
    },
    userImgAlt() {
      return `${this.username}'s picture`;
    },
    username() {
      return this.$store.getters.user.displayName;
    },
    userEmail() {
      return this.$store.getters.user.email;
    },
  },
  mounted() {
    document.title = 'Account';
  },
};
</script>

<style scoped>
.card-img-top {
  width: 10rem;
}
</style>
