<template>
  <div class="login">
    <div id="firebase-auth-container"></div>
  </div>
</template>

<script>
import { firebase, authUI } from '@/assets/js/firebase/index';

export default {
  name: 'login',
  mounted: () => {
    authUI.start('#firebase-auth-container', {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'cookingtutorials.net',
    });
  },
};
</script>

<style>
</style>
