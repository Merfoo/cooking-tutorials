<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link to="/" class="navbar-brand">
      <img class="logo" src="../assets/imgs/cooking-tutorials-logo.svg"/>
      Cooking Tutorials
    </router-link>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ml-auto">
        <li v-if="!signedIn" class="nav-item">
          <router-link to="/login" class="nav-link">Sign In</router-link>
        </li>
        <li v-else class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img id="userImg" :src="userImgSrc">
            {{ username }}
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <router-link to="/account" class="dropdown-item">Account</router-link>
            <router-link to="/create" class="dropdown-item">Create Recipe</router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
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
};
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
}

#userImg {
  width: 2rem;
  border-radius: 50%;
}

#navbarDropdownMenuLink:hover {
  cursor: pointer;
}
</style>
