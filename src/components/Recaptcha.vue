<template>
  <div class="g-recaptcha" :data-sitekey="sitekey"></div>
</template>

<script>
/* global grecaptcha */

export default {
  data() {
    return {
      sitekey: '6LfBeyAUAAAAAOg5qF3ULlNpdMy6JJC1i0NavQ1t',
      recaptchaId: 0,
    };
  },
  mounted() {
    if (window.grecaptcha) {
      this.recaptchaId = grecaptcha.render(document.getElementsByClassName('g-recaptcha')[0], { sitekey: this.sitekey });
    }
  },
};
</script>
