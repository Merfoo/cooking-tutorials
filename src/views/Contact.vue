<template>
  <div class="container">
    <div v-if="showSuccess" class="alert alert-success" role="alert">
      Message sent!
    </div>
    <div v-if="showError" class="alert alert-danger" role="alert">
      Don't forget to do the reCAPTCHA!
    </div>
    <div id="message"></div>
    <h2>Contact Us</h2>
    <p>
     We welcome messages of any kind! To send us a message just complete and submit the form below!
    </p>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="name">Name</label>
            <input v-model="name" class="form-control" type="text" name="name" placeholder="First and last name" maxlength="20" required/>
          </div>
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input v-model="email" class="form-control" type="email" name="email" placeholder="Email to respond to" maxlength="50" required/>
          </div>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea v-model="content" class="form-control" type="textarea" name="content" placeholder="The message you want to send to us" maxlength="500" rows="7" required/>
        </div>
        <div class="form-group">
          <Recaptcha></Recaptcha>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </fieldset>
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
      showSuccess: false,
      showError: false,
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
        this.showSuccess = false;
        this.showError = false;

        if (data.success) {
          this.name = '';
          this.email = '';
          this.content = '';
          this.showSuccess = true;
        }

        else {
          this.showError = true;
        }
      });

      grecaptcha.reset();
    },
  },
  mounted() {
    document.title = 'Contact Us';
  },
};
</script>
