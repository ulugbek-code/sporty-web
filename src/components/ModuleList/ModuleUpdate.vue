<template>
  <div class="create-wrap">
    <div v-if="categories.length" class="div-wrap">
      <h1 class="text-center mb-3">Обновите модуль</h1>
      <div v-if="allImages.length"></div>
      <form @submit.prevent="" @keydown.enter="updateModule">
        <div class="inp-wrap" :class="!className && isEmpty ? 'error' : ''">
          <span>Имя</span>
          <input v-model="className" type="text" placeholder="Имя модуля..." />
          <div class="icon">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 5V27.5M7.5 5H21.25C21.913 5 22.5489 5.26339 23.0178 5.73223C23.4866 6.20107 23.75 6.83696 23.75 7.5V22.5C23.75 23.163 23.4866 23.7989 23.0178 24.2678C22.5489 24.7366 21.913 25 21.25 25H7.5C7.16848 25 6.85054 24.8683 6.61612 24.6339C6.3817 24.3995 6.25 24.0815 6.25 23.75V6.25C6.25 5.91848 6.3817 5.60054 6.61612 5.36612C6.85054 5.1317 7.16848 5 7.5 5V5Z"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 10H18.75"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 15H18.75"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <template v-if="defaultVal">
          <module-drop-down
            :options="categories"
            :edit="true"
            :defaultVal="defaultVal"
            :isEmpty="isEmpty"
            @input="getCategory"
          ></module-drop-down>
        </template>
        <div class="inp-wrap" :class="!description && isEmpty ? 'error' : ''">
          <span>Описание</span>
          <textarea
            v-model="description"
            type="text"
            placeholder="Описание..."
          ></textarea>
          <div class="icon">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.33301 6.5H21.6663"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.33301 13H15.1663"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.33301 19.5H19.4997"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="length">
            <p>{{ description.length }} / 1024</p>
          </div>
        </div>
        <div class="inp-wrap with-img">
          <image-upload
            :img="images[0]"
            :baseUrl="baseUrl"
            :editModule="true"
            :qty="0"
            :isEmpty="isEmpty"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
          <image-upload
            :img="images[1]"
            :baseUrl="baseUrl"
            :editModule="true"
            :qty="1"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
          <image-upload
            :img="images[2]"
            :baseUrl="baseUrl"
            :editModule="true"
            :qty="2"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
        </div>
        <div class="d-flex gap-3">
          <button @click="closeUpd" class="btn btn-secondary w-50">
            Отмена
          </button>
          <button
            @click="updateModule"
            class="btn btn-primary w-50"
            :disabled="!allImages.length"
            type="submit"
          >
            Обновить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import ModuleDropDown from "./ModuleDropDown.vue";
import ImageUpload from "../StudentList/ImageUpload.vue";
export default {
  props: ["moduleId"],
  emits: ["closeUpdate"],
  components: {
    ModuleDropDown,
    ImageUpload,
  },
  data() {
    return {
      isEmpty: false,
      baseUrl: process.env.VUE_APP_IMAGE_URL,
      classId: null,
      className: "",
      description: "",
      categories: [],
      category: "",
      defaultVal: "",
      images: [],
      allImages: [],
    };
  },
  methods: {
    addImage(val) {
      if (!val?.value?.name) return;
      this.allImages[val.idx] = val.value;
    },
    removeImg(val) {
      this.allImages.splice(val, 1, null);
    },
    getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    },

    async onImageEdit(imgUrl) {
      let imgExt = this.getUrlExtension(imgUrl);
      //imgExt is png,jpeg,svg or ...
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], "profileImage." + imgExt, {
        type: blob.type,
      });
      this.allImages[0] = file;
    },
    async onImageEdit1(imgUrl) {
      let imgExt = this.getUrlExtension(imgUrl);
      //imgExt is png,jpeg,svg or ...
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], "profileImage." + imgExt, {
        type: blob.type,
      });
      this.allImages[1] = file;
    },
    async onImageEdit2(imgUrl) {
      let imgExt = this.getUrlExtension(imgUrl);
      //imgExt is png,jpeg,svg or ...
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], "profileImage." + imgExt, {
        type: blob.type,
      });
      this.allImages[2] = file;
    },
    closeUpd() {
      this.$emit("closeUpdate");
    },
    closeCreateModule() {
      this.$store.dispatch("changeCreateModule", true);
    },
    async updateModule() {
      if (
        !this.className ||
        !this.description ||
        this.allImages.length === 0 ||
        this.category === ""
      ) {
        this.isEmpty = true;
        return;
      }
      try {
        let fileData = new FormData();
        fileData.append(
          "data",
          JSON.stringify({
            id: this.classId,
            module: JSON.parse(localStorage.getItem("info")).user.id,
            category: this.category,
            name: this.className,
            description: this.description,
          })
        );
        for (let i = 0; i < this.allImages.length; i++) {
          fileData.append("image", this.allImages[i]);
        }
        await customAxios.post("class-erp/update_class/", fileData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await this.$store.dispatch("getModuleLists");
        this.closeUpd();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getModuleById() {
      try {
        const res = await customAxios.get(
          `class-erp/get_details/?id=${this.moduleId}`
        );
        this.images = res.data.images;
        this.classId = res.data.id;
        this.className = res.data.name;
        this.description = res.data.description;
        this.defaultVal = res.data.category_name;
        this.category = res.data.category_id;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    getCategory(val) {
      this.category = val;
    },
    async getCategories() {
      try {
        const res = await customAxios.get("class-erp/get_category/");
        this.categories = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    await this.getModuleById();
    await this.getCategories();
    if (this.images.length >= 1)
      this.onImageEdit(this.baseUrl + this.images[0]);
    if (this.images.length >= 2)
      this.onImageEdit1(this.baseUrl + this.images[1]);
    if (this.images.length == 3)
      this.onImageEdit2(this.baseUrl + this.images[2]);
  },
};
</script>

<style scoped>
.create-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background: #fff;
  padding-left: 1rem;
}
.div-wrap {
  min-width: 450px;
}
h1 {
  font-weight: 700;
}
h6 {
  font-weight: 600;
}
.link-div {
  cursor: pointer;
}
.inp-wrap {
  position: relative;
  background: #f6f6f6;
  border-radius: 8px;
  padding: 1.4rem 8px 2px;
  margin-bottom: 12px;
}
.with-img {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 150px;
}
.with-img div {
  flex: 1;
  margin-bottom: 16px;
}
.inp-wrap span {
  color: #b6bccb;
  font-size: 13px;
  font-weight: 600;
  top: 4px;
  left: 10px;
  position: absolute;
}
.inp-wrap input,
.inp-wrap textarea {
  padding: 4px;
  background: none;
  border: none;
  outline: none;
  font-size: 15px;
  width: 92%;
}
.inp-wrap textarea {
  resize: none;
  padding-bottom: 1rem;
}
input::placeholder,
textarea::placeholder {
  color: #868789;
}
.btn-secondary {
  background: #b6bccb;
  border: 1px solid #b6bccb;
}
button {
  border-radius: 8px;
}
.btn-secondary:hover {
  background: #8f929a;
}
.icon {
  position: absolute;
  right: 8px;
  top: 12px;
}
.icon svg {
  width: 90%;
}
.length {
  font-size: 12px;
  color: #b6bccb;
  position: absolute;
  right: 8px;
  bottom: -10px;
}
.error span {
  color: #ea4335;
}
</style>
