<template>
  <footer class="footer">
    <div class="link-container">
      <router-link class="footer-link" to="/about">About</router-link>
      <router-link class="footer-link" to="/policies">Policies</router-link>
      <router-link class="footer-link" to="/contact">Contact</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer-bar',
};
</script>

<style>
.footer {
  background-color: lightgray;
  width: 100%;
  height: 50px;
}

.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.footer-link {
  margin-left: 20px;
  margin-right: 20px;
  text-decoration: none;
  color: black;
}

.footer-link:hover {
  border-bottom: 2px solid blue;
  color: blue;
}
</style>
