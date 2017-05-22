<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <ul class="nav">
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/policies">Policies</router-link>
          <router-link class="nav-link" to="/contact">Contact</router-link>
          <router-link class="nav-link" to="/donate">Donate</router-link>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer-bar',
};
</script>

<style scoped>
.nav-link {
  color: black;
}
</style>
