<template>
  <div class="create-wrap">
    <div>
      <h2 class="mb-3">Добавить новый уровень</h2>
      <form @submit.prevent="" @keydown.enter="saveLevel">
        <module-drop-down
          :isEmpty="isEmpty"
          :options="moduleList"
          defaultVal="Не Выбрано"
          @input="getModule"
        ></module-drop-down>
        <div class="inp-wrap" :class="!levelName && isEmpty ? 'error' : ''">
          <span>Уровень обучения</span>
          <input
            v-model="levelName"
            type="text"
            placeholder="Введите уровень"
          />
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
        <div class="inp-wrap" :class="!levelDuration && isEmpty ? 'error' : ''">
          <span>Длительность обучения</span>
          <input
            v-model="levelDuration"
            type="number"
            @input="convertDuration()"
            placeholder="в месяцах"
          />
          <div class="icon">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.4997 5.41666H6.49967C5.30306 5.41666 4.33301 6.38671 4.33301 7.58332V20.5833C4.33301 21.7799 5.30306 22.75 6.49967 22.75H19.4997C20.6963 22.75 21.6663 21.7799 21.6663 20.5833V7.58332C21.6663 6.38671 20.6963 5.41666 19.4997 5.41666Z"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.333 3.25V7.58333"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.66699 3.25V7.58333"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.33301 11.9167H21.6663"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.917 16.25H13.0003"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 16.25V19.5"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <module-drop-down
          :isEmpty="isEmpty"
          title="Возрастная аудитория"
          :options="allStatuses"
          defaultVal="Не Выбрано"
          @input="getStatus"
        ></module-drop-down>
        <div class="inp-wrap" :class="!qtyLessons && isEmpty ? 'error' : ''">
          <span>Количество посещений в тарифе</span>
          <input
            v-model="qtyLessons"
            @input="convertQty()"
            type="number"
            placeholder="Введите количество посещений"
          />
          <div class="icon">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.917 6.5H21.667"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.917 13H21.667"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 19.5H21.6667"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.33301 17.3333C4.33301 16.7587 4.56128 16.2076 4.96761 15.8013C5.37394 15.3949 5.92504 15.1667 6.49967 15.1667C7.07431 15.1667 7.62541 15.3949 8.03174 15.8013C8.43807 16.2076 8.66634 16.7587 8.66634 17.3333C8.66634 17.9736 8.12467 18.4167 7.58301 18.9583L4.33301 21.6667H8.66634"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.49967 10.8333V4.33334L4.33301 6.5"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div
          class="inp-wrap"
          :class="(!levelPrice || levelPrice === '0') && isEmpty ? 'error' : ''"
        >
          <span>Стоимость абонимента</span>
          <input
            v-model="levelPrice"
            type="text"
            @input="convertPrice()"
            placeholder="в сумме"
          />
          <div class="icon">
            <svg
              class="uzs"
              width="32"
              height="13"
              viewBox="0 0 34 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5.4h2V8a4 4 0 0 1-2.2 3.7c-.7.3-1.5.5-2.4.5-1 0-1.8-.2-2.5-.6a4 4 0 0 1-1.7-1.4C.3 9.5.1 8.8.1 8V.4h2.2v7.4c0 .5 0 1 .3 1.3.2.4.5.7.9.9.4.2.8.3 1.4.3.5 0 1-.1 1.4-.3.3-.2.7-.5.9-1 .2-.3.3-.7.3-1.2V.4ZM11.8 12v-1.3l6-8.6h-6V.4h8.6v1.3l-6 8.5h6V12h-8.6ZM29 3.6c0-.5-.3-1-.7-1.2-.4-.3-.9-.4-1.5-.4-.5 0-.8 0-1.2.2l-.7.5a1.3 1.3 0 0 0 0 1.4c0 .2.2.4.4.5l.6.3.7.2 1.1.3c.5 0 .9.2 1.3.4s.8.4 1 .7c.4.2.7.5.9 1 .2.3.3.7.3 1.2a3.2 3.2 0 0 1-2 3c-.7.3-1.5.5-2.5.5a6 6 0 0 1-2.3-.4c-.7-.3-1.2-.7-1.6-1.3-.3-.5-.6-1.2-.6-2h2c.1.5.2.8.5 1l.8.7 1.2.2c.5 0 .9 0 1.2-.2l.8-.6.3-.9c0-.3 0-.5-.2-.7a2 2 0 0 0-.8-.5 7 7 0 0 0-1-.4l-1.4-.3c-1-.3-1.7-.7-2.2-1.2-.6-.5-.9-1.1-.9-2 0-.6.2-1.2.6-1.8.4-.5.9-.9 1.5-1.2.7-.3 1.4-.4 2.2-.4.8 0 1.5.1 2.2.4.6.3 1 .7 1.4 1.2.4.5.6 1.1.6 1.8h-2Z"
                fill="#B6BCCB"
              />
            </svg>
          </div>
        </div>
        <div class="d-flex gap-3 mt-3">
          <button @click="closeCreateModule" class="btn btn-secondary w-50">
            Отмена
          </button>
          <button @click="saveLevel" class="btn btn-primary w-50">
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
export default {
  emits: ["closeAddLevel"],
  components: {
    ModuleDropDown,
  },
  data() {
    return {
      isEmpty: false,
      moduleId: "",
      levelName: "",
      levelDuration: "",
      status: "",
      qtyLessons: "",
      levelPrice: "",
      allStatuses: [
        { id: "old", name: "Для взрослых" },
        { id: "young", name: "Для детей" },
        { id: "all", name: "Для всех возрастов" },
      ],
    };
  },
  computed: {
    moduleList() {
      return this.$store.getters.moduleLists;
    },
    removedPrice() {
      if (this.levelPrice) {
        return this.levelPrice.replace(/\s/g, "");
      } else return "";
    },
  },
  methods: {
    getStatus(val) {
      this.status = val;
    },
    convertDuration() {
      if (this.levelDuration < 0)
        this.levelDuration = Math.abs(this.levelDuration);
    },
    convertQty() {
      if (this.qtyLessons < 0) this.qtyLessons = Math.abs(this.qtyLessons);
    },
    convertPrice() {
      if (isNaN(this.levelPrice[0])) this.levelPrice = "";

      this.levelPrice = this.levelPrice.replaceAll(" ", "");
      let x = Number(this.levelPrice);
      this.levelPrice = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      if (this.levelPrice < 0) this.levelPrice = Math.abs(this.levelPrice);
    },
    closeCreateModule() {
      this.$store.dispatch("changeCreateLevel", true);
    },
    async saveLevel() {
      if (
        !this.levelName ||
        !this.levelDuration ||
        !this.status ||
        !this.moduleId ||
        this.qtyLessons === "" ||
        !this.levelPrice ||
        this.levelPrice === "0"
      ) {
        this.isEmpty = true;
        return;
      }
      try {
        await customAxios.post("level/", {
          clas: this.moduleId,
          name: this.levelName,
          duration: this.levelDuration,
          status: this.status,
          number_of_lessons: this.qtyLessons,
          price: this.removedPrice,
        });
        await this.$store.dispatch("getModuleLists");
        this.$store.dispatch("changeCreateLevel", true);
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    getModule(val) {
      this.moduleId = val;
    },
  },
  async created() {
    await this.$store.dispatch("getModuleLists");
  },
  unmounted() {
    this.$emit("closeAddLevel", this.moduleId);
  },
};
</script>

<style scoped>
.create-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding-left: 1rem;
}
h2 {
  font-size: 2.2rem;
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
.inp-wrap span {
  color: #b6bccb;
  font-size: 13px;
  font-weight: 600;
  top: 4px;
  left: 10px;
  position: absolute;
}
.inp-wrap input {
  padding: 4px;
  background: none;
  border: none;
  outline: none;
  width: 95%;
  font-size: 15px;
}
input::placeholder {
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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.icon {
  position: absolute;
  right: 8px;
  top: 12px;
}
.icon svg {
  width: 90%;
}
.error .uzs path {
  fill: #ea4335;
}
.error span {
  color: #ea4335;
}
</style>
