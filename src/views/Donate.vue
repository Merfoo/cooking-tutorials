<template>
  <div class="container">
    <div v-if="showSuccess" class="alert alert-success">
      Thanks for your donation!
    </div>
    <h2>Donate</h2>
    <PaymentCardInput @donated="donated"></PaymentCardInput>
  </div>
</template>

<script>
import PaymentCardInput from '@/components/PaymentCardInput';

export default {
  name: 'donate',
  data() {
    return {
      showSuccess: false,
    };
  },
  components: {
    PaymentCardInput,
  },
  methods: {
    donated() {
      this.showSuccess = true;
      console.log('why is this so hard');
    },
  },
};
</script>
