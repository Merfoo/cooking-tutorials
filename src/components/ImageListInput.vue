<template>
  <div class="form-group">
    <p>ImageFiles</p>
    <div v-for="(image, index) in imageFiles">
      <div>
        {{ imageNames[index] }}
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
  data() {
    return {
      imageNames: [],
    };
  },
  methods: {
    addImage() {
      this.imageFiles.push(null);
      this.imageNames.push('');
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1);
      this.imageNames.splice(index, 1);
    },
    updateImageFile(e, index) {
      // NOTE: When setting elements in an array, arr[index] = 0,
      // you must call a function like splice so that vuejs can register
      // the change event
      this.imageFiles.splice(index, 1, null);
      this.imageNames.splice(index, 1, e.target.value.split('\\').pop());

      if (e.target.files.length > 0) {
        this.imageFiles.splice(index, 1, e.target.files[0]);
      }
    },
  },
};
</script>
