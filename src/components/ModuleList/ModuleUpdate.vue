<template>
  <div class="create-wrap">
    <div v-if="categories.length" class="div-wrap">
      <h1 class="mb-3">Обновите модуль</h1>
      <div v-if="allImages.length"></div>
      <form @submit.prevent="" @keydown.enter="updateModule">
        <div class="inp-wrap">
          <span>Имя</span>
          <input v-model="className" type="text" placeholder="Имя модуля..." />
          <div class="icon">
            <img src="../../assets/book-attendance.svg" alt="" />
          </div>
        </div>
        <template v-if="defaultVal">
          <module-drop-down
            :options="categories"
            :edit="true"
            :defaultVal="defaultVal"
            @input="getCategory"
          ></module-drop-down>
        </template>

        <div class="inp-wrap">
          <span>Описание</span>
          <textarea
            v-model="description"
            type="text"
            placeholder="Описание..."
          ></textarea>
          <div class="icon">
            <img src="../../assets/lines.svg" alt="" />
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
  computed: {
    isFull() {
      return !this.className || !this.description || !this.category;
    },
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
.icon img {
  width: 90%;
}
.length {
  font-size: 12px;
  color: #b6bccb;
  position: absolute;
  right: 8px;
  bottom: -10px;
}
</style>
