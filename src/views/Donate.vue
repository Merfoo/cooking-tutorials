<template>
  <div class="container">
    <div v-if="showSuccess" class="alert alert-success">
      {{ successMessage }}
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
      successMessage: '',
    };
  },
  components: {
    PaymentCardInput,
  },
  methods: {
    donated(name, email) {
      this.showSuccess = true;
      this.successMessage = `Thank you for your donation ${name}! A receipt has been sent to ${email}`;
    },
  },
  mounted() {
    document.title = 'Donate';
  },
};
</script>
