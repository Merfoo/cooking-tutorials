<template>
  <div class="container">
    <div class="policies">
      <article id="official-web-disclaimer">
        <h2>Official Web Disclaimer</h2>
        <p>
          Information contained in this website is for general Information
          purposes only. Information provided will be accurate and kept
          up-to-date to the best of our ability, though we can't guarantee 
          it always will be.
        </p>
        <p>
          Unless noted otherwise, information on the site does not officially 
          represent us.
        </p>
      </article>
      <article id="acceptable-use">
        <h2>Acceptable Use</h2>
        <p>
          We support an environment of equal rights and opportunities through
          the use of computers, phones, laptops, networks, and tablets.
        </p>
      </article>
      <article id="return-policy">
        <h2>Return Policy</h2>
        <p>
          No items are returnable. Buy at your own risk. If items were returnable
          the return time would be at most 1 week after the day the item was bought.
          The customer is responsible the shipping and handling fee of returning items.
        </p>
      </article>
      <article id="privacy-policy">
        <h2>Privacy Policy</h2>
        <p>
          Only minimal information shall be used for interactions between the user and
          the website. Information for 
          <a href="https://www.google.com/analytics/#?modal_active=none" target="_blank">Google Analytics</a>
          to help monitor traffic will also be collected. We do not sell user information to
          3rd parties.
        </p>
      </article>
      <article id="dcma">
        <h2>Digital Millennium Copyright Act</h2>
        <p>
          This website shall follow the guidelines setup by the Digital Millennium Copyright Act ("DCMA").
          The DCMA was enacted in 1998 to balance the interests of internet service providers and copright holders.
          The act criminalizes the circumvention of electronic and digital copyright protection systems.
        </p>
        <p>
          A more complete summary of the DCMA can be found <a href="https://www.copyright.gov/reports/studies/dmca/dmca_executive.html" target="_blank">here</a>.
        </p>
        <p>
          Contact us <router-link to="/contact" target="_blank">here</router-link> to notify us of alleged copyright infringement.
        </p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'policies',
  mounted() {
    document.title = 'Policies';
  },
};
</script>
