<template>
  <div id="carouselIndicators" class="carousel slide" data-ride="carousel">
    <h5>Images</h5>
    <ol class="carousel-indicators">
      <li v-for="(url, index) in imageUrls" data-target="#carouselIndicators" :data-slide-to="index"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div v-for="(url, index) in imageUrls" class="carousel-item">
        <img class="carousel-img rounded mx-auto d-block" :src="url" :alt="imageCaptions[index]">
        <div class="carousel-caption d-none d-md-block">
          <p>{{ imageCaptions[index] }}</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'image-carousel',
  props: [
    'imageCaptions',
    'imageUrls',
  ],
  watch: {
    imageUrls(newImageUrls) {
      if (newImageUrls.length > 0) {
        // First element needs active class attached
        this.$nextTick(() => {
          document.querySelector('li[data-slide-to]').classList.add('active');
          document.querySelector('.carousel-item').classList.add('active');
        });
      }
    },
  },
};
</script>

<style scoped>
#carouselIndicators {
  margin-bottom: 10px;
}

.carousel-img {
  max-height: 300px;
  width: auto;
}

.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}

.carousel-control-next-icon {
  background-image : url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}

.carousel-caption {
  color: black;
}
</style>
