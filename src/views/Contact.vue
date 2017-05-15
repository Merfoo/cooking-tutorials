<template>
  <div class="container">
    <div class="alert alert-success" role="alert">
      Message sent!
    </div>
    <div class="alert alert-danger" role="alert">
      Don't forget to do the reCAPTCHA!
    </div>
    <div id="message"></div>
    <h2>Contact Us</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" class="form-control" type="text" name="name" placeholder="First and last name" maxlength="20" required/>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" class="form-control" type="email" name="email" placeholder="Email to respond to" maxlength="50" required/>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea v-model="content" class="form-control" type="textarea" name="content" placeholder="The message you want to send to us" maxlength="140" required/>
      </div>
      <div class="form-group">
        <Recaptcha></Recaptcha>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
/* global $ */
/* global grecaptcha */

import Recaptcha from '@/components/Recaptcha';

export default {
  name: 'contact',
  data() {
    return {
      name: '',
      email: '',
      content: '',
    };
  },
  components: {
    Recaptcha,
  },
  methods: {
    /* eslint-disable object-shorthand */
    onSubmit: function () {
      $.post('/contact', {
        name: this.name,
        email: this.email,
        content: this.content,
        'g-recaptcha-response': grecaptcha.getResponse(),
      }).done((data) => {
        $('.alert').hide();

        if (data.success) {
          this.name = '';
          this.email = '';
          this.content = '';
          $('.alert-success').show();
        } else {
          $('.alert-danger').show();
        }
      });

      grecaptcha.reset();
    },
  },
  mounted() {
    $('.alert').hide();
  },
};
</script>
