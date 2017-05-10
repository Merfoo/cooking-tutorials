<template>
  <div class="account">
    <div class="account-container">
      <h2>Account</h2>
      <div class="account-info-container">
        <div class="account-img-container">
          <img id="account-img":src="userImgSrc"/>
          <h3>{{ userName }}</h3>
        </div>
        <div class="account-details">
          <h4>Email</h4>
          <p>{{ userEmail }}</p>
        </div>
        <button id="signOut" @click="signOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { firebase } from '@/assets/js/firebase/index';

export default {
  name: 'account',
  computed: {
    /* eslint-disable */
    userImgSrc: function () {
      return store.getters.user.photoURL;
    },
    /* eslint-disable */
    userName: function () {
      return store.getters.user.displayName;
    },
    /* eslint-disable */
    userEmail: function () {
      return store.getters.user.email;
    },
  },
  methods: {
    /* eslint-disable */
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('home');
      });
    },
  }
};
</script>

<style>
.account {
  display: flex;
  justify-content: center;
}

.account-img-container {
  display: flex;
  align-content: center;
}

.account-img-container h3{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: 20px;
}

#account-img {
  width: 50px;
  height: 50px;
}
</style>
