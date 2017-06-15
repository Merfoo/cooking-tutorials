<template>
  <div class="container">
    <div v-if="showSuccess" class="alert alert-success">
      {{ successMessage }}
    </div>
    <h2>Donate</h2>
    <div class="row">
      <div class="col-md-12">
        <p>
        Help support the longevity and continued development of this website, donations
        go towards the cost of maintaining the server for this website. Card information is
        never sent to or stored on our server. Payments are transferred securely using 
        <a href="https://stripe.com/about" target="_blank">Stripe</a>, an online service trusted by thousands
        of other companies for making online transactions. For information about our return policy go
        <router-link to="/policies" target="_blank">here</router-link>. If you're feeling extra gracious you should
        checkout our fellow partner sites <router-link to="/partner-sites" target="_blank">here</router-link>!
        </p>
      </div>
    </div>
    <PaymentCardInput @donated="donated"></PaymentCardInput>
    <div class="qrCodeContainer">
      <h5>QR Code of this page</h5>
      <img src="../assets/imgs/donate-QR-code.png">
    </div>
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
    document.title = 'Donate - Cooking Tutorials';
  },
};
</script>

<style scoped>
.qrCodeContainer {
  margin-top: 25px;
}
</style>
