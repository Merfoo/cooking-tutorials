<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <div class="router-view-container">
      <router-view></router-view>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import FooterBar from '@/components/FooterBar';

export default {
  name: 'app',
  components: {
    HeaderBar,
    FooterBar,
  },
};
</script>
