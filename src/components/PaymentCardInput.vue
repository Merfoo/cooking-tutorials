<template>
  <div>
    <form id="payment-form">
      <div class="row">
        <div class="col-md-12">
          <p>
          Help support the longevity and continued development of this website, donations
          go towards the cost of maintaining the server for this website. Card information is
          never sent or stored on our server. Payments are transferred securely using 
          <a href="https://stripe.com/about" target="_blank">Stripe</a>, an online service trusted by thousands
          of other companies for making online transactions. For information about our return policy go
          <router-link to="/policies" target="_blank">here</router-link>.
          </p>
        </div>
        <div class="form-group col-md-6">
          <label for="card-holder">Name</label>
          <input v-model="name" name="card-holder" class="form-control" type="text" placeholder="Jane Doe" required/>
        </div>
        <div class="form-group col-md-6">
          <label for="email">Email</label>
          <input v-model="email" name="email" class="form-control" type="email" placeholder="example@email.com" required/>
        </div>
        <div class="form-group col-md-6">
          <label for="card-element">Credit or Debit card</label>
          <div id="card-element">
          </div>
          <div v-if="errorMessage" id="card-errors" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
        </div>
        <div class="form-group col-md-6">
          <label for="charge-amount">Amount</label>
          <div class="input-group">
            <span class="input-group-addon">$</span>
            <input v-model="chargeAmount" name="charge-amount" class="form-control" type="number" min="1.00" step="0.01" required/>
          </div>
        </div>
      </div>
      <button id="submitButton" class="btn btn-primary" type="submit">Donate</button>
    </form>
  </div>
</template>

<script>
/* global Stripe */
/* global $ */

export default {
  name: 'payment-card-input',
  data() {
    return {
      name: '',
      email: '',
      chargeAmount: 1.00,
      errorMessage: '',
    };
  },
  mounted() {
    const stripe = Stripe('pk_live_pOtbnOvh0CqYx3jNBzeZTtBW');
    const elements = stripe.elements();
    const cardStyle = {
      base: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    };

    const card = elements.create('card', { style: cardStyle });
    card.mount('#card-element');

    card.addEventListener('change', (event) => {
      this.errorMessage = '';

      if (event.error) {
        this.errorMessage = event.error.message;
      }
    });

    const $form = document.getElementById('payment-form');
    $form.addEventListener('submit', (event) => {
      event.preventDefault();

      stripe.createToken(card, { name: this.name }).then((result) => {
        if (result.error) {
          this.errorMessage = result.error.message;
        }

        else {
          $.post('/donate', {
            stripeToken: result.token.id,
            email: this.email,
            chargeAmount: this.chargeAmount * 100,
          }).done((error) => {
            if (error) {
              this.errorMessage = error.message;
            }

            else {
              this.$emit('donated', this.name, this.email);
              this.name = '';
              this.email = '';
              this.chargeAmount = 1.00;
              card.clear();
            }
          });
        }
      });
    });
  },
};
</script>
