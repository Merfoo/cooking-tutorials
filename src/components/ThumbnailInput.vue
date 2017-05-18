<template>
  <div class="form-group">
    <p>Thumbnail (125px by 125px)</p>
    <div v-if="showBrowse">
      <div>
        {{ thumbnailFilename }}
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
      thumbnailFile: null,
      thumbnailFilename: '',
      showBrowse: false,
    };
  },
  methods: {
    updateThumbnailFile(thumbnailFile) {
      this.$emit('updateThumbnailFile', thumbnailFile);
    },
    thumbnailFileChange(e) {
      this.thumbnailFilename = '';
      this.thumbnailFile = null;

      if (e.target.files.length > 0) {
        this.thumbnailFile = e.target.files[0];
        this.thumbnailFilename = this.thumbnailFile.name;
      }

      this.updateThumbnailFile(this.thumbnailFile);
    },
    addThumbnail() {
      this.showBrowse = true;
    },
    removeThumbnail() {
      this.showBrowse = false;
      this.thumbnailFilename = '';
      this.thumbnailFile = null;
      this.updateThumbnailFile(this.thumbnailFile);
      document.getElementById('thumbnailFileInput').value = null;
    },
  },
};
</script>
