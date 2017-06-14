<template>
  <div class="form-group">
    <h5>Thumbnail (will be displayed as 125px by 125px)</h5>
    <div class="filename">
      Filename: {{ thumbnailFile ? thumbnailFile.name : '' }}
    </div>
    <label class="btn btn-secondary">
      Browse <input id="thumbnailFileInput" type="file" accept=".jpg" hidden @change="thumbnailFileChange">
    </label>
  </div>
</template>

<script>
export default {
  name: 'thumbnail-input',
  props: [
    'thumbnailFile',
  ],
  methods: {
    thumbnailFileChange(e) {
      let thumbnailFile = null;

      if (e.target.files.length > 0) {
        thumbnailFile = e.target.files[0];
      }

      this.$emit('update:thumbnailFile', thumbnailFile);
    },
  },
};
</script>

<style scoped>
.filename {
  margin: 5px 0;
}
</style>
