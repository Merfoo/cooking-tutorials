<template>
  <div class="container">
    <article>
      <h2>About</h2>
      <p>Cooking Tutorials, a library of quick and easy recipes!</p>
      <p>
        Cooking Tutorials is a website that contains easy to follow food recipes submitted
        people. The website is developed using <a href="https://vuejs.org/" target="_blank">Vue.js</a>
        for the frontend with <a href="https://firebase.google.com/" target="_blank">Firebase</a> for storage.
        The website source code is on <a href="https://github.com/Merfoo/cooking-tutorials" target="_blank">GitHub</a>.
        The backend is developed using <a href="https://expressjs.com/" target="_blank">Express</a> on top of
        <a href="https://nodejs.org/en/" target="_blank">Node.js</a>. The backend source code is also on 
        <a href="https://github.com/Merfoo/cooking-tutorials-backend" target="_blank">GitHub</a>.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  name: 'about',
  mounted() {
    document.title = 'About - Cooking Tutorials';
  },
};
</script>
