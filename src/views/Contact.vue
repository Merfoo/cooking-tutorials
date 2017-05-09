<template>
  <div class="contact">
    <div class="contact-contaner">
      <div id="message"></div>
      <h2>Contact Us</h2>
      <form class="contact-form" action="/contact/" method="POST" @submit.prevent="onSubmit">
        <label for="name">Name</label>
        <input id="name-input" class="user-input" type="text" name="name" placeholder="First and last name" maxlength="20" required/>

        <label for="email">Email</label>
        <input id="email-input" class="user-input" type="email" name="email" placeholder="Email to respond to" maxlength="50" required/>

        <label for="content">Content</label>
        <textarea id="content-input" class="user-input" type="textarea" name="content" placeholder="The message you want to send to us" maxlength="140" required/>

        <Recaptcha></Recaptcha>
        <br/>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import Recaptcha from '@/components/Recaptcha';

export default {
  name: 'contact',
  components: {
    Recaptcha,
  },
  methods: {
    onSubmit: () => {
      /* eslint-disable no-undef */
      $.post('/contact', {
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        content: document.getElementById('content-input').value,
        /* eslint-disable no-undef */
        'g-recaptcha-response': grecaptcha.getResponse(),
      }).done((data) => {
        const $message = $('#message');

        if (data.success) {
          $message.text('Success!');
          $message.css('color', 'green');
          $('.user-input').val('');
        } else {
          $message.text('Fill out the ReCaptcha!');
          $message.css('color', 'red');
        }
      });

      /* eslint-disable no-undef */
      grecaptcha.reset();
    },
  },
};
</script>

<style>
.contact {
  padding: 10px;
  display: flex;
  justify-content: center;
}

#message {
  text-align: center;
}

.contact-container {
  width: 75%;
  margin: 0 auto;
}

.contact-form label {
  display: block;
  margin-bottom: 5px;
}

.user-input {
  border-radius: 2px;
  border: 1px solid grey;
  margin-bottom: 10px;
  height: 30px;
  width: 750px;
  padding: 5px;
}

textarea.user-input {
  height: 50px;
}
</style>
