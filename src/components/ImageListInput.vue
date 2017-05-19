<template>
  <div class="form-group">
    <p>Images</p>
    <div v-for="(image, index) in imageFiles">
      <div>
        {{ imageFiles[index] ? imageFiles[index].name : '' }}
      </div>
      <label class="btn btn-secondary">
        Browse <input type="file" accept=".jpg" hidden @change="updateImageFile($event, index)"/>
      </label>
      <button class="btn btn-danger align-top" type="button" @click="removeImage(index)">Remove</button>
    </div>
    <button class="btn btn-secondary" type="button" @click="addImage">Add</button>
  </div>
</template>

<script>
export default {
  name: 'image-list-input',
  props: [
    'imageFiles',
  ],
  methods: {
    addImage() {
      this.$emit('addImageFile', null);
    },
    removeImage(index) {
      this.$emit('removeImageFile', index);
    },
    updateImageFile(e, index) {
      let imageFile = null;

      if (e.target.files.length > 0) {
        imageFile = e.target.files[0];
      }

      this.$emit('updateImageFile', index, imageFile);
    },
  },
};
</script>
