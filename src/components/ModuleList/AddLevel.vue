<template>
  <div class="create-wrap">
    <div>
      <h2 class="mb-3">Добавить новый уровень</h2>
      <form @submit.prevent="" @keydown.enter="saveLevel">
        <module-drop-down
          :options="moduleList"
          defaultVal="Не Выбрано"
          @input="getModule"
        ></module-drop-down>
        <div class="inp-wrap">
          <span>Уровень обучения</span>
          <input
            v-model="levelName"
            type="text"
            placeholder="Введите уровень"
          />
          <div class="icon">
            <img src="../../assets/book-attendance.svg" alt="" />
          </div>
        </div>
        <div class="inp-wrap">
          <span>Длительность обучения</span>
          <input
            v-model="levelDuration"
            type="number"
            @input="convertDuration()"
            placeholder="в месяцах"
          />
          <div class="icon">
            <img src="../../assets/month.svg" alt="" />
          </div>
        </div>
        <module-drop-down
          title="Возрастная аудитория"
          :options="allStatuses"
          defaultVal="Не Выбрано"
          @input="getStatus"
        ></module-drop-down>
        <div class="inp-wrap">
          <span>Количество посещений в тарифе</span>
          <input
            v-model="qtyLessons"
            @input="convertQty()"
            type="number"
            placeholder="Введите количество посещений"
          />
          <div class="icon">
            <img src="../../assets/one-two.svg" alt="" />
          </div>
        </div>
        <div class="inp-wrap">
          <span>Стоимость абонимента</span>
          <input
            v-model="levelPrice"
            type="text"
            @input="convertPrice()"
            placeholder="в сумме"
          />
          <div class="icon">
            <img src="../../assets/uzs.svg" alt="" />
          </div>
        </div>
        <div class="d-flex gap-3 mt-3">
          <button @click="closeCreateModule" class="btn btn-secondary w-50">
            Отмена
          </button>
          <button
            @click="saveLevel"
            class="btn btn-primary w-50"
            :disabled="isFull"
          >
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
    isFull() {
      return (
        !this.levelName ||
        !this.levelDuration ||
        !this.status ||
        !this.moduleId ||
        !this.qtyLessons ||
        !this.levelPrice
      );
    },
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
  justify-content: left;
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
.icon img {
  width: 90%;
}
</style>
