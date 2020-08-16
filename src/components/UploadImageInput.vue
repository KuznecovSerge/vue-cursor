<template>
  <div
    class="image-input"
    :style="style"
    @click="chooseImage"
  >
    <span v-if="!imageData" class="placeholder">Choose an Image</span>
    <input class="file-input" ref="fileInput" type="file" @input="onSelectFile" />
  </div>
</template>

<script>
export default {
  name: "UploadImageInput",

  props: {
    imageData: null,
    size: null
  },
  computed: {
    style() {
      const img = `background-image: url(${this.imageData}) `;
      return (this.size) ? `${img}; width: ${this.size}px; height: ${this.size}px; ` : img ;
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },

    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    }
  }
};
</script>

<style scoped>
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
}

.image-input:hover:after {
  content: "";
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(6, 121, 159, 0.3);
}

.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}
</style>