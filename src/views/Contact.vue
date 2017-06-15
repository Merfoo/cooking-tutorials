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
          <VueRecaptcha :sitekey="sitekey" ref="invisibleRecaptcha" size="invisible" @verify="onVerify"></VueRecaptcha>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
/* global $ */

import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'contact',
  data() {
    return {
      sitekey: '6LdaiSUUAAAAADe76eOE1iazt27CrYiB1hLnkpe5',
      name: '',
      email: '',
      content: '',
      showSuccess: false,
      showError: false,
    };
  },
  components: {
    VueRecaptcha,
  },
  methods: {
    onSubmit() {
      this.$refs.invisibleRecaptcha.execute();
    },
    onVerify(recaptchaResponse) {
      $.post('/api/contact-us', {
        name: this.name,
        email: this.email,
        content: this.content,
        recaptchaResponse,
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

      this.$refs.invisibleRecaptcha.reset();
    },
  },
  mounted() {
    document.title = 'Contact Us - Cooking Tutorials';
  },
};
</script>
