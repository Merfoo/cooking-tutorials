<template>
  <div class="g-recaptcha" :data-sitekey="sitekey"></div>
</template>

<script>
export default {
  data() {
    return {
      sitekey: '6LfBeyAUAAAAAOg5qF3ULlNpdMy6JJC1i0NavQ1t',
      recaptchaId: 0,
    };
  },
  /* eslint-disable */
  mounted: function() {
    if (window.grecaptcha) {
      /* eslint-disable no-undef */
      this.recaptchaId = grecaptcha.render(document.getElementsByClassName('g-recaptcha')[0], { sitekey: this.sitekey });
    }
  },
};
</script>

<style>
</style>
