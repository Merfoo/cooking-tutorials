<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link to="/" class="navbar-brand">
      <img class="logo" src="../assets/imgs/cooking-tutorials-logo.svg" alt="Cooking Tutorials Logo"/>
      Cooking Tutorials
    </router-link>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create Recipe</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li v-if="!signedIn" class="nav-item">
          <router-link to="/login" class="nav-link">Sign In</router-link>
        </li>
        <li v-else class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img id="userImg" :src="userImgSrc" alt="User profile photo">
            {{ username }}
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <router-link to="/account" class="dropdown-item">Account</router-link>
            <button class="btn btn-primary dropdown-item" @click="signOut">Sign Out</button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { firebase } from '@/assets/js/firebase/index';

export default {
  name: 'header-bar',
  computed: {
    signedIn() {
      return this.$store.getters.user;
    },
    userImgSrc() {
      return this.$store.getters.user.photoURL;
    },
    username() {
      return this.$store.getters.user.displayName;
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
.logo {
  width: 50px;
  height: 50px;
}

.nav-item {
  margin-top: auto;
  margin-bottom: auto;
}

#userImg {
  width: 2rem;
  border-radius: 50%;
}

#navbarDropdownMenuLink:hover {
  cursor: pointer;
}
</style>
