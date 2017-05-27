<template>
  <div class="card">
    <div class="card-block">
      <div class="user-info">
        <router-link :to="userLink">
          <img :src="userProfilePhotoUrl" :alt="userThumbnailAlt" class="user-thumbnail float-left">
          {{ username }}
        </router-link>
        <p>{{ commentDate }}</p>
      </div>
      <p class="card-text">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import user from '@/assets/js/user';

export default {
  name: 'comment',
  props: ['comment'],
  data() {
    return {
      userProfilePhotoUrl: '',
    };
  },
  computed: {
    userLink() {
      return `/user/${this.comment.userId}`;
    },
    userThumbnailAlt() {
      return `${this.username}'s thumbnail`;
    },
    username() {
      return this.comment.username;
    },
    content() {
      return this.comment.content;
    },
    commentDate() {
      return `${moment(this.comment.createdAt).format('MMM Do YYYY, h:mm a')}`;
    },
  },
  mounted() {
    user.getProfilePhotoUrl(this.comment.userId).then((userProfilePhotoUrl) => {
      this.userProfilePhotoUrl = userProfilePhotoUrl;
    });
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 5px;
}

.user-info {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}

.user-thumbnail {
  width: 4rem;
  margin-right: 10px;
}
</style>
