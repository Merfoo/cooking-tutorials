<template>
  <div class="form-group">
    <p>Images</p>
    <div v-for="(image, index) in images">
      <div>
        {{ imageNames[index] }}
      </div>
      <label class="btn btn-secondary">
        Browse <input type="file" accept=".jpg" hidden @change="updateImageFile($event, index)"/>
      </label>
      <button class="btn btn-danger" type="button" @click="removeImage(index)">Remove</button>
    </div>
    <button class="btn btn-secondary" type="button" @click="addImage">Add</button>
  </div>
</template>

<script>
export default {
  name: 'image-list',
  props: [
    'images',
  ],
  data() {
    return {
      imageNames: [],
    };
  },
  methods: {
    addImage() {
      this.images.push(null);
      this.imageNames.push('');
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.imageNames.splice(index, 1);
    },
    updateImageFile(e, index) {
      // NOTE: When setting elements in an array, arr[index] = 0,
      // you must call a function like splice so that vuejs can register
      // the change event
      this.images.splice(index, 1, null);
      this.imageNames.splice(index, 1, e.target.value.split('\\').pop());

      if (e.target.files.length > 0) {
        this.images.splice(index, 1, e.target.files[0]);
      }
    },
  },
};
</script>
