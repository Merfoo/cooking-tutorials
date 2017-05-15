<template>
  <div class="container">
    <div class="card">
      <img class="card-img-top" :src="userImgSrc" :alt="userImgAlt">
      <div class="card-block">
        <h4 class="card-title">{{ userName }}</h4>
        <p class="card-text">{{ userEmail }}</p>
        <button class="btn btn-primary" @click="signOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from '@/assets/js/firebase/index';

export default {
  name: 'account',
  computed: {
    userImgSrc() {
      return this.$store.getters.user.photoURL;
    },
    userImgAlt() {
      return `${this.userName}'s picture`;
    },
    userName() {
      return this.$store.getters.user.displayName;
    },
    userEmail() {
      return this.$store.getters.user.email;
    },
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('home');
      });
    },
  },
};
</script>

<style scoped>
.card-img-top {
  width: 10rem;
}
</style>
