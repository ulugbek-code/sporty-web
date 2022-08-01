<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Добавить новый модуль</h1>
      <form @submit.prevent="" @keydown.enter="saveModule">
        <div class="inp-wrap">
          <span>Имя</span>
          <input v-model="className" type="text" placeholder="Имя модуля..." />
          <div class="icon">
            <img src="../../assets/book-attendance.svg" alt="" />
          </div>
        </div>
        <module-drop-down
          :options="categories"
          defaultVal="Не Выбрано"
          @input="getCategory"
        ></module-drop-down>
        <div class="inp-wrap">
          <span>Описание</span>
          <textarea
            v-model="description"
            type="text"
            placeholder="Описание..."
            maxlength="1024"
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
            :moduleCreate="true"
            :qty="0"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
          <image-upload
            :moduleCreate="true"
            :qty="1"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
          <image-upload
            :moduleCreate="true"
            :qty="2"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
        </div>
        <div class="d-flex gap-3">
          <button @click="closeCreateModule" class="btn btn-secondary w-50">
            Отмена
          </button>
          <button @click="saveModule" class="btn btn-primary w-50">
            Сохранить
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
  emits: ["closeAddModule"],
  components: {
    ModuleDropDown,
    ImageUpload,
  },
  data() {
    return {
      className: "",
      description: "",
      categories: [],
      category: "",
      moduleId: "",
      images: [],
    };
  },
  computed: {
    isFull() {
      return !this.className || !this.description || !this.category;
    },
  },
  methods: {
    addImage(val) {
      if (!val.value?.name) return;
      if (this.images[val.idx]) {
        this.images[val.idx] = val.value;
      } else {
        this.images.push(val.value);
      }
    },
    removeImg(val) {
      this.images = this.images.filter((img) => img !== val);
    },
    closeCreateModule() {
      this.$store.dispatch("changeCreateModule", true);
    },
    async saveModule() {
      try {
        let fileData = new FormData();
        fileData.append(
          "data",
          JSON.stringify({
            module_id: JSON.parse(localStorage.getItem("info")).user.id,
            category_id: this.category,
            name: this.className,
            description: this.description,
          })
        );
        for (let i = 0; i < this.images.length; i++) {
          fileData.append("image", this.images[i]);
        }
        const res = await customAxios.post("class-erp/post/", fileData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.moduleId = res.data.id;
        await this.$store.dispatch("getModuleLists");
        this.$store.dispatch("changeCreateModule", true);
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
    await this.getCategories();
  },
  unmounted() {
    this.$emit("closeAddModule", this.moduleId);
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
  width: 95%;
  font-size: 15px;
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
