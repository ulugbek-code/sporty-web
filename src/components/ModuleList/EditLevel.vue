<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Обновить уровень</h1>
      <form @submit.prevent="" @keydown.enter="updateLevel">
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
        <template v-if="defaultStatus">
          <module-drop-down
            title="Возрастная аудитория"
            :options="allStatuses"
            :edit="true"
            :defaultVal="
              defaultStatus == 'all'
                ? 'Для всех возрастов'
                : defaultStatus == 'old'
                ? 'Для взрослых'
                : 'Для детей'
            "
            @input="getStatus"
          ></module-drop-down>
        </template>
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
          <button
            @click="closeEditLevel"
            class="btn btn-secondary w-50"
            type="button"
          >
            Отмена
          </button>
          <button
            @click="updateLevel"
            class="btn btn-primary w-50"
            :disabled="isFull"
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
export default {
  props: ["lvl"],
  emits: ["closeEdit"],
  components: {
    ModuleDropDown,
  },
  data() {
    return {
      levelName: this.lvl?.name,
      levelDuration: this.lvl?.duration,
      status: this.lvl?.status,
      qtyLessons: this.lvl?.number_of_lessons,
      levelPrice: this.numberWithSpaces(this.lvl?.price),
      defaultStatus: this.lvl?.status,
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
    closeEditLevel() {
      this.$emit("closeEdit");
    },
    numberWithSpaces(x) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    },
    async updateLevel() {
      try {
        await customAxios.patch(`level/${this.lvl?.id}/`, {
          clas: this.lvl?.clas,
          name: this.levelName,
          duration: this.levelDuration,
          status: this.status,
          number_of_lessons: this.qtyLessons,
          price: this.removedPrice,
        });
        await this.$store.dispatch("getModuleLists");
        this.$emit("closeEdit", true);
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    await this.$store.dispatch("getModuleLists");
  },
};
</script>

<style scoped>
.create-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
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
  width: 90%;
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
