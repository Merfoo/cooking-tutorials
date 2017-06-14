<template>
  <div class="form-group">
    <h5>Images</h5>
    <div v-for="(image, index) in imageFiles">
      <div class="form-group">
        <div class="filename">
          Filename: {{ imageFiles[index] ? imageFiles[index].name : '' }}
        </div>
        <input :value="imageCaptions[index]" @input="updateImageCaption(index, $event.target.value)" type="text" class="form-control caption-input" placeholder="Caption..."/>
        <label class="btn btn-secondary">
          Browse <input :id="index" type="file" accept=".jpg" hidden @change="updateImageFile(index, $event)"/>
        </label>
        <button class="btn btn-danger align-top" type="button" @click="removeImage(index)">Remove</button>
      </div>
    </div>
    <button class="btn btn-secondary" type="button" @click="addImage">Add</button>
  </div>
</template>

<script>
export default {
  name: 'image-list-input',
  props: [
    'imageFiles',
    'imageCaptions',
  ],
  methods: {
    addImage() {
      this.$emit('addImageFile', null);

      this.$nextTick(() => {
        document.getElementById(this.imageFiles.length - 1).click();
      });
    },
    removeImage(index) {
      this.$emit('removeImageFile', index);
    },
    updateImageFile(index, e) {
      let imageFile = null;

      if (e.target.files.length > 0) {
        imageFile = e.target.files[0];
      }

      this.$emit('updateImageFile', index, imageFile);
    },
    updateImageCaption(index, value) {
      this.$emit('updateImageCaption', index, value);
    },
  },
};
</script>

<style scoped>
.caption-input {
  margin-bottom: 5px;
}

.filename {
 margin: 5px 0;
}
</style>
