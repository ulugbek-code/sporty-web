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
          @click="deleteLevel"
          class="w-50 btn btn-outline-primary py-2 px-5"
        >
          Да
        </button>
      </div>
    </template>
  </base-dialog>
  <div v-if="level && moduleN" class="each-lvl d-flex">
    <div class="first">
      <h6 class="mb-2">{{ level.name }}</h6>
      <p class="p-id">
        ID: <span>{{ level.id }}</span>
      </p>
    </div>
    <div class="second d-flex gap-3">
      <div>
        <p>Модуль</p>
        <h6 class="mb-2">{{ moduleN }}</h6>
        <p>Общее количество уроков:</p>
        <h6 class="mb-2">{{ level.number_of_lessons }}</h6>
        <p>Часы занятий:</p>
        <h6>{{ level.duration }} <span class="text-success">месяцев</span></h6>
      </div>
      <div>
        <p>Цена</p>
        <h6 class="mb-2 d-flex">
          {{ numberWithSpaces(level.price) }}
          <span class="text-success">UZS</span>
        </h6>
        <p>Цена урока</p>
        <h6 class="d-flex">
          {{ numberWithSpaces(level.lesson_price.toFixed(2)) }}
          <span class="text-success">UZS</span>
        </h6>
      </div>
      <div>
        <p>Date Created:</p>
        <h6 class="mb-2">{{ formatDate(level.create_at) }}</h6>
        <p>Возрастная аудитория</p>
        <h6>
          {{
            level.status === "all"
              ? "Для всех возростов"
              : level.status === "old"
              ? "Для взрослых"
              : "Для детей"
          }}
        </h6>
      </div>
    </div>
    <div class="third">
      <span @click="editLevel(level.id)" class="edit">
        <svg
          width="22"
          height="22"
          viewBox="0 0 26 26  "
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.74968 7.58337H6.49967C5.92504 7.58337 5.37394 7.81165 4.96761 8.21798C4.56128 8.6243 4.33301 9.17541 4.33301 9.75004V19.5C4.33301 20.0747 4.56128 20.6258 4.96761 21.0321C5.37394 21.4384 5.92504 21.6667 6.49967 21.6667H16.2497C16.8243 21.6667 17.3754 21.4384 17.7817 21.0321C18.1881 20.6258 18.4163 20.0747 18.4163 19.5V16.25"
            stroke="#B6BCCB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.75 16.25H13L22.2083 7.04163C22.6393 6.61065 22.8814 6.02612 22.8814 5.41663C22.8814 4.80713 22.6393 4.2226 22.2083 3.79163C21.7774 3.36065 21.1928 3.11853 20.5833 3.11853C19.9738 3.11853 19.3893 3.36065 18.9583 3.79163L9.75 13V16.25Z"
            stroke="#B6BCCB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.333 5.41663L20.583 8.66663"
            stroke="#B6BCCB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span @click="triggerDelete" class="delete"
        ><svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 0.5L0.5 9.5M0.5 0.5L9.5 9.5"
            stroke="#B6BCCB"
            stroke-linecap="round"
            stroke-width="1.5"
          /></svg
      ></span>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import BaseDialog from "../UI/BaseDialog.vue";
export default {
  props: ["level", "moduleN"],
  emits: ["deleteLevel", "editLvl"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      isDelete: false,
    };
  },
  methods: {
    editLevel(id) {
      this.$emit("editLvl", id);
    },
    async deleteLevel() {
      try {
        await customAxios.get(`level/delete/?id=${this.level.id}`);
        this.closeDelete();
        this.$emit("deleteLevel");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    triggerDelete() {
      this.isDelete = true;
    },
    closeDelete() {
      this.isDelete = false;
    },
    formatDate(val) {
      return val.slice(8, 10) + "." + val.slice(5, 7) + "." + val.slice(0, 4);
    },
    numberWithSpaces(x) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    },
  },
};
</script>

<style scoped>
.each-lvl {
  gap: 4px;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 12px;
}
.first {
  width: 22%;
}
.third {
  width: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.second {
  flex: 66%;
}
.second div:first-child {
  flex: 2;
}
.second div:first-child {
  flex: 1;
}
.second div:last-child {
  flex: 2;
}
h6,
p {
  margin-bottom: 0;
}
h6 {
  font-weight: 600;
  font-size: 14px;
}
p {
  color: #9aa0ae;
  font-size: 13px;
}
h6.desc {
  font-weight: 400;
  font-size: 13px;
}
.text-success {
  font-size: 10px;
  margin-left: 2px;
}
.third span svg {
  width: 24px;
}
.p-id span {
  color: #016bd4;
}
.p-lvl span {
  color: #000;
}
.third span:hover {
  cursor: pointer;
}
span svg path {
  transition: all 0.2s ease;
}
.edit svg:hover path {
  stroke: #ffc107;
}
.delete:hover svg path {
  stroke: #dc3545;
}
</style>
