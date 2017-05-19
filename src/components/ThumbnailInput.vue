<template>
  <div class="form-group">
    <p>Thumbnail (125px by 125px)</p>
    <div v-if="showBrowse">
      <div>
        {{ thumbnailFile ? thumbnailFile.name : '' }}
      </div>
      <label class="btn btn-secondary">
        Browse <input id="thumbnailFileInput" type="file" accept=".jpg" hidden @change="thumbnailFileChange">
      </label>
      <button class="btn btn-danger align-top" type="button" @click="removeThumbnail">Remove</button>
    </div>
    <button v-else class="btn btn-secondary" type="button" @click="addThumbnail">Add</button>
  </div>
</template>

<script>
export default {
  name: 'thumbnail-input',
  data() {
    return {
      showBrowse: false,
    };
  },
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
    addThumbnail() {
      this.showBrowse = true;
    },
    removeThumbnail() {
      this.showBrowse = false;
      this.$emit('update:thumbnailFile', null);
      document.getElementById('thumbnailFileInput').value = null;
    },
  },
};
</script>
