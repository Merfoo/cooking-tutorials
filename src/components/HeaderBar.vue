<template>
  <header class="header">
    <router-link to="/" class="site-title-link">
      <Icon name="cutlery"></Icon>
      <h1 class="site-title">Cooking Tutorials</h1>
    </router-link>
    <router-link class="login-link" to="/login">
      <Icon name="sign-in"></Icon>
      Login
    </router-link>
    </nav>
  </header>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'header-bar',
  components: {
    Icon,
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
