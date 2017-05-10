<template>
  <header class="header">
    <router-link to="/" class="site-title-link">
      <Icon name="cutlery"></Icon>
      <h1 class="site-title">Cooking Tutorials</h1>
    </router-link>
    <router-link v-if="!signedIn" class="login-link" to="/login">
      <Icon name="sign-in"></Icon>
      Login
    </router-link>
    <router-link v-else class="login-link" to="/account">
      <img id="header-user-img" :src="userImgSrc"/>
    </router-link>
    </nav>
  </header>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import store from '@/store';

export default {
  name: 'header-bar',
  components: {
    Icon,
  },
  computed: {
    /* eslint-disable */
    signedIn: function () {
      return store.getters.user;
    },
    /* eslint-disable */
    userImgSrc: function () {
      return store.getters.user.photoURL;
    },
  },
};
</script>

<style>
header {
  background-color: black;
  color: white;
  padding: 5px;
  position: relative;
}

#header-user-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.site-title-link {
  text-decoration: none;
  color: white;
  margin: 10px;
}

.site-title-link .fa-icon {
  width: auto;
  height: 1.5em;
}

.site-title {
  display: inline-block;
  padding-left: 10px;
  margin: 0;
}


.login-link {
  text-decoration: none;
  color: white;
  top: 10px;
  right: 10px;
  position: absolute;
}

.login-link .fa-icon {
  width: auto;
  height: 1em;
}

.navlist {
  list-style-type: none;
  margin: 0px;
}

.navitem {
  display: inline-block;
  padding: 5px 20px;
}

.navitem a {
  text-decoration: none;
  color: white;
}
</style>
