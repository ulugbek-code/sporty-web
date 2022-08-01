<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Добавить новый модуль</h1>
      <form @submit.prevent="" @keydown.enter="saveModule">
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
        <module-drop-down
          :options="categories"
          :isEmpty="isEmpty"
          defaultVal="Не Выбрано"
          @input="getCategory"
        ></module-drop-down>
        <div class="inp-wrap" :class="!description && isEmpty ? 'error' : ''">
          <span>Описание</span>
          <textarea
            v-model="description"
            type="text"
            placeholder="Описание..."
            maxlength="1024"
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
            :moduleCreate="true"
            :qty="0"
            :isEmpty="isEmpty"
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
      isEmpty: false,
      className: "",
      description: "",
      categories: [],
      category: "",
      moduleId: "",
      images: [],
    };
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
      if (
        !this.className ||
        !this.description ||
        this.images.length === 0 ||
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
