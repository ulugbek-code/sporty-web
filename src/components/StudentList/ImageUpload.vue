<template>
  <div
    class="dropbox"
    :class="imageData ? 'border-0' : ''"
    :style="{ 'background-image': `url(${imageData})` }"
  >
    <span
      @click.stop="removeImage(imageData)"
      v-if="imageData"
      class="float-end"
      >&times;</span
    >
    <span v-if="isLoading" class="loading">загрузка...</span>
    <input
      class="input-file"
      type="file"
      accept="image/*"
      ref="file"
      @change="handleFileUpload"
    />
    <div v-if="!imageData" class="icon text-center">
      <h1 class="mb-0">+</h1>
      <p v-if="!moduleCreate">Выберите изображение</p>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  props: ["img", "baseUrl", "qty", "moduleCreate", "editModule"],
  data() {
    return {
      isLoading: false,
      imageData: this.img ? this.baseUrl + this.img : null,
    };
  },
  methods: {
    removeImage() {
      if (this.moduleCreate) {
        this.$emit("r-input", this.$refs.file.files[0]);
      } else if (this.editModule) {
        this.$emit("r-input", this.qty);
      } else {
        this.$emit("r-input");
      }
      this.$refs["file"].value = "";
      this.imageData = null;
    },
    handleFileUpload() {
      const input = this.$refs.file;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        this.isLoading = true;
        reader.onload = (e) => {
          this.imageData = e.target.result;
          this.isLoading = false;
        };
        reader.readAsDataURL(files[0]);
        if (this.moduleCreate || this.editModule) {
          this.$emit("input", { idx: this.qty, value: files[0] });
        } else {
          this.$emit("input", files[0]);
        }
      }
    },
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  /* height: 30%; */
  top: 40%;
  left: 25%;
  /* background: rgb(255, 255, 255); */
  z-index: 10;
}
.dropbox {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: 2px dashed #dee2e6;
  border-radius: 10px;
  width: 100%;
  /* width and height were 100 px */
  height: 100%;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  cursor: pointer;
  z-index: 1;
}
.icon {
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d9d9d9;
  pointer-events: none;
}
span.float-end {
  position: relative;
  z-index: 1000;
  display: none;
  background: rgb(243, 66, 66);
  font-size: 15px;
  border-radius: 50%;
  padding: 0 6px 0 6px;
}
.dropbox:hover span.float-end {
  display: initial;
  cursor: pointer;
}
.dropbox:hover {
  background-blend-mode: luminosity;
}
@media screen and (max-width: 768px) {
  .dropbox {
    width: 80px;
    height: 80px;
  }
}
</style>
