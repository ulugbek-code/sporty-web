<template>
  <base-dialog :show="isDelete" @close="closeDelete">
    <template #default>
      <div class="form-task text-center">
        <h4 class="mt-2">Вы действительно хотите удалить?</h4>
      </div>
      <div class="d-flex gap-3 mt-5">
        <button @click="closeDelete" class="w-50 btn btn-danger py-2 px-5">
          Нет
        </button>
        <button
          @click="deleteModule"
          class="w-50 btn btn-outline-primary py-2 px-5"
        >
          Да
        </button>
      </div>
    </template>
  </base-dialog>
  <!--  -->
  <div id="myModal" class="modal" @click="closeModal">
    <span class="close">&times;</span>
    <img @click.stop="" class="modal-content" id="img01" />
  </div>
  <!--  -->
  <div
    v-if="
      each && !createModule && !createLevel && !updateModule && !isEditLevel
    "
    class="detail-wrap px-4"
  >
    <div class="title d-flex align-items-end gap-4 mb-4">
      <h3 class="fw-bold">{{ each.name }}</h3>
      <p class="text-secondary">
        ID: <span class="text-primary">{{ each.id }}</span>
      </p>
    </div>
    <div class="sub-title d-flex mb-3">
      <div class="w-15">
        <h5>Дата создания</h5>
        <p>{{ formatDate(each.create_at) }}</p>
      </div>
      <div class="w-30">
        <h5>Описание</h5>
        <p class="desc">
          {{ each.description }}
        </p>
      </div>
      <div class="w-55 d-flex">
        <img
          v-for="(img, idx) in each.images"
          :key="idx"
          :id="`myImg-${idx}`"
          :src="baseUrl + img"
          @click="openImg({ value: img, index: idx })"
        />
      </div>
    </div>
    <div class="lvl-btn mb-4">
      <button
        v-if="each?.class_levels?.length"
        @click="showLevels = !showLevels"
        class="btn"
      >
        Уровни
        <span class="polygon" :class="showLevels ? 'active-bg' : ''"></span>
      </button>
    </div>
    <module-levels
      v-if="showLevels"
      :levels="each?.class_levels"
      :moduleName="each.name"
      @deleteLvl="getModuleAgain"
      @editLevel="editLvl"
    ></module-levels>
    <div class="abs-wrap d-flex gap-2">
      <button @click="triggerUpdate" class="btn btn-primary">Изменить</button>
      <button @click="triggerDelete(each.id)" class="btn btn-danger">
        Удалить
      </button>
    </div>
  </div>
  <div v-else-if="createModule" class="detail-wrap">
    <module-create @closeAddModule="getModuleAgain"></module-create>
  </div>
  <div v-else-if="createLevel" class="detail-wrap">
    <add-level @closeAddLevel="getModuleAgain"></add-level>
  </div>
  <div v-else-if="updateModule" class="detail-wrap">
    <module-update :moduleId="each.id" @closeUpdate="closeUpd"></module-update>
  </div>
  <div v-else-if="isEditLevel" class="detail-wrap">
    <edit-level :lvl="level" @closeEdit="closeEd"></edit-level>
  </div>

  <div
    v-else
    class="detail-wrap d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <img src="../../assets/empty-guy.svg" alt="" />
      <h6 class="mt-2">Выберите <b>модуль</b> чтобы посмотреть детально</h6>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const ModuleCreate = defineAsyncComponent(() => import("./ModuleCreate.vue"));
const ModuleUpdate = defineAsyncComponent(() => import("./ModuleUpdate.vue"));
const AddLevel = defineAsyncComponent(() => import("./AddLevel.vue"));
const EditLevel = defineAsyncComponent(() => import("./EditLevel.vue"));
import customAxios from "../../api";
import ModuleLevels from "./ModuleLevels.vue";
import BaseDialog from "../UI/BaseDialog.vue";
export default {
  props: ["eachId", "updChanged"],
  emits: ["removeModule", "changeEachId"],
  components: {
    ModuleLevels,
    BaseDialog,
    ModuleCreate,
    ModuleUpdate,
    AddLevel,
    EditLevel,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_IMAGE_URL,
      each: null,
      showLevels: true,
      isDelete: false,
      updateModule: false,
      deleteId: null,
      isEditLevel: false,
      level: null,
    };
  },
  computed: {
    createModule() {
      return this.$store.getters.isCreateModule;
    },
    createLevel() {
      return this.$store.getters.isCreateLevel;
    },
  },
  methods: {
    closeModal() {
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    },
    openImg(val) {
      let modal = document.getElementById("myModal");

      // Get the image and insert it inside the modal - use its "alt" text as a caption

      let modalImg = document.getElementById("img01");
      let that = this;

      modal.style.display = "block";
      modalImg.src = that.baseUrl + val.value;

      // Get the <span> element that closes the modal
      let span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };
    },
    async closeEd(val) {
      if (val) await this.getModuleAgain();
      this.isEditLevel = false;
    },
    async editLvl(val) {
      try {
        const res = await customAxios.get(`level/${val}/`);
        this.level = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
      this.isEditLevel = true;
    },
    async getModuleAgain(val) {
      if (val) {
        this.$emit("changeEachId", val);
        return;
      }
      if (this.eachId) await this.getModuleById();
    },
    async closeUpd() {
      await this.getModuleById();
      this.updateModule = false;
    },
    triggerUpdate() {
      this.updateModule = true;
    },
    closeDelete() {
      this.isDelete = false;
      this.deleteId = null;
    },
    triggerDelete(id) {
      this.isDelete = true;
      this.deleteId = id;
    },
    async deleteModule() {
      try {
        await customAxios.get(`class-erp/delete/?id=${this.deleteId}`);
        this.$emit("removeModule");
        this.closeDelete();
        this.each = null;
        await this.$store.dispatch("getModuleLists");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getModuleById() {
      try {
        const res = await customAxios(
          `class-erp/get_details/?id=${this.eachId}`
        );
        this.each = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    formatDate(val) {
      return val.slice(8, 10) + "." + val.slice(5, 7) + "." + val.slice(0, 4);
    },
  },
  watch: {
    async eachId(val) {
      if (val) await this.getModuleById();
    },
    updChanged() {
      this.updateModule = false;
      this.isEditLevel = false;
    },
  },
};
</script>

<style scoped>
.detail-wrap {
  position: relative;
  width: 80%;
  height: 100%;
  padding: 1rem;
  background: #fff;
  border-radius: 15px;
  overflow: auto;
}
h3,
h5,
p {
  margin-bottom: 0;
}
h5 {
  font-size: 14px;
  font-weight: 500;
  color: #9aa0ae;
  margin-bottom: 2px;
}
p {
  font-size: 15px;
  font-weight: 500;
  line-height: 19px;
}
p.desc {
  font-size: 13px;
}
.lvl-btn button {
  background: #9aa0ae;
  color: #fff;
  font-size: 14px;
  transition: all 0.2s ease;
}
.lvl-btn button:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.polygon {
  position: relative;
}
.polygon:after {
  position: relative;
  content: "";
  transition: all 0.3s ease;
  margin-left: 12px;
  top: 12px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}
.polygon.active-bg:after {
  border-color: transparent transparent #fff transparent;
  top: -10px;
}
.abs-wrap {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.abs-wrap button {
  font-size: 14px;
}
h6 {
  color: #b6bccb;
  font-weight: 600;
}
.w-15 {
  width: 15%;
}
.w-30 {
  width: 30%;
}
.w-55 {
  width: 55%;
  gap: 4px;
}
/*  */
img {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
.w-55 img {
  width: 33%;
}
.w-55 img:hover {
  opacity: 0.9;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}
/* Add Animation */
.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0.1);
  }
  to {
    transform: scale(1);
  }
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>
