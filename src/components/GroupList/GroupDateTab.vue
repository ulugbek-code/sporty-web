<template>
  <div v-if="isEqualTab">
    <div v-if="!isSaved" class="d-flex justify-content-evenly mt-3">
      <div class="start text-center">
        <p>Часы работы с</p>
        <div class="input-wrap">
          <input
            v-model="startH"
            type="number"
            maxlength="2"
            min="00"
            max="24"
            @input="checkStH"
            @blur="addZero1"
            tabindex="0"
            placeholder="ЧЧ"
            id="startHH"
          />
          <input
            v-model="startM"
            type="number"
            maxlength="2"
            min="00"
            max="60"
            @input="checkStM"
            @blur="addZero2"
            tabindex="0"
            placeholder="ММ"
            id="startMM"
          />
        </div>
      </div>
      <div class="finish text-center">
        <p>Часы работы до</p>
        <div class="input-wrap">
          <input
            v-model="finishH"
            type="number"
            maxlength="2"
            min="00"
            max="24"
            @input="checkFiH"
            @blur="addZero3"
            tabindex="0"
            placeholder="ЧЧ"
            id="finishHH"
          />
          <input
            v-model="finishM"
            type="number"
            maxlength="2"
            min="00"
            max="60"
            @input="checkFiM"
            @blur="addZero4"
            tabindex="0"
            placeholder="ММ"
            id="finishMM"
          />
        </div>
      </div>
    </div>
    <div v-else class="mt-3">
      <div class="start-p d-flex justify-content-evenly">
        <p class="text-center">Часы работы с</p>
        <p class="text-center">Часы работы до</p>
      </div>
      <div class="finish-p d-flex justify-content-evenly align-items-center">
        <p class="my-2">{{ startH }}:{{ startM }}</p>
        -
        <p class="my-2">{{ finishH }}:{{ finishM }}</p>
        <span @click="reset"
          ><svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 0.5L0.5 9.5M0.5 0.5L9.5 9.5"
              stroke="#6c757d"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="actions d-flex justify-content-between">
      <button
        @click="saveDate"
        class="btn btn-primary w-100"
        :disabled="isSaved"
      >
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["day", "isEqualTab", "week"],
  emits: ["updateDate", "deleteDate"],
  data() {
    return {
      maxLength: 2,
      isSaved: false,
      startH: this.day ? this.day.start_date.slice(0, 2) : "",
      startM: this.day ? this.day.start_date.slice(3, 5) : "",
      finishH: this.day ? this.day.finish_date.slice(0, 2) : "",
      finishM: this.day ? this.day?.finish_date?.slice(3, 5) : "",
    };
  },
  computed: {
    canSave() {
      return !this.startH || !this.startM || !this.finishH || !this.finishM;
    },
  },
  methods: {
    addZero1() {
      if (this.startH.toString().length === 1) {
        this.startH = "0" + this.startH;
      }
    },
    addZero2() {
      if (this.startM.toString().length === 1) {
        this.startM = "0" + this.startM;
      }
    },
    addZero3() {
      if (this.finishH.toString().length === 1) {
        this.finishH = "0" + this.finishH;
      }
    },
    addZero4() {
      if (this.finishM.toString().length === 1) {
        this.finishM = "0" + this.finishM;
      }
    },
    checkStH() {
      if (this.startH > 24) {
        this.startH = this.startH.toString().slice(0, 2);
      }
      if (this.startH.toString().length >= this.maxLength) {
        let string = this.startH.toString().slice(0, this.maxLength);
        this.startH = Number(string);
      }
    },
    checkStM() {
      if (this.startM > 60) {
        this.startM = this.startM.toString().slice(0, 2);
      }
      if (this.startM.toString().length >= this.maxLength) {
        let string = this.startM.toString().slice(0, this.maxLength);
        this.startM = Number(string);
      }
    },
    checkFiH() {
      if (this.finishH > 24) {
        this.finishH = this.finishH.toString().slice(0, 2);
      }
      if (this.finishH.toString().length >= this.maxLength) {
        let string = this.finishH.toString().slice(0, this.maxLength);
        this.finishH = Number(string);
      }
    },
    checkFiM() {
      if (this.finishM > 60) {
        this.finishM = this.finishM.toString().slice(0, 2);
      }
      if (this.finishM.toString().length >= this.maxLength) {
        let string = this.finishM.toString().slice(0, this.maxLength);
        this.finishM = Number(string);
      }
    },
    saveDate() {
      this.isSaved = true;
      let startDate, finishDate;
      startDate = `${this.startH}:${this.startM}`;
      finishDate = `${this.finishH}:${this.finishM}`;
      this.$emit("updateDate", {
        week: [this.week],
        start_date: startDate,
        finish_date: finishDate,
      });
    },
    reset() {
      this.isSaved = false;
      this.startH = "";
      this.startM = "";
      this.finishH = "";
      this.finishM = "";
      this.$emit("deleteDate", {
        week: [this.week],
      });
    },
  },
  //   watch: {
  //     startH(val) {
  //       if (isNaN(this.startH[0])) this.startH = "";
  //       if (val < 0) this.startH = Math.abs(this.startH);
  //       if (val.length == 2 && this.startM.length == 2) {
  //         document.getElementById("finishHH").focus();
  //       } else if (val.length == 2 && !this.startM.length) {
  //         document.getElementById("startMM").focus();
  //       }
  //     },
  //     startM(val) {
  //       if (isNaN(this.startM[0])) this.startM = "";
  //       if (val < 0) this.startM = Math.abs(this.startM);
  //       if (val.length == 2 && this.startH.length == 2) {
  //         document.getElementById("finishHH").focus();
  //       } else if (val.length == 2 && this.startH.length != 2) {
  //         document.getElementById("startHH").focus();
  //       }
  //     },
  //     finishH(val) {
  //       if (isNaN(this.finishH[0])) this.finishH = "";
  //       if (val < 0) this.finishH = Math.abs(this.finishH);
  //       if (val.length == 2) {
  //         document.getElementById("finishMM").focus();
  //       }
  //     },
  //     finishM(val) {
  //       if (isNaN(this.finishM[0])) this.finishM = "";
  //       if (val < 0) this.finishM = Math.abs(this.finishM);
  //     },
  //   },
};
</script>

<style scoped>
input {
  background: #f5f5f5;
  border: none;
  width: 60px;
  height: 36px;
  outline: none;
  text-align: center;
  padding-left: 1rem;
}
input:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 1px solid #9d9d9d;
}
input:nth-child(2) {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
p {
  color: #1b1b1d;
  margin-bottom: 8px;
}
button,
.start,
.finish,
.start-p p {
  width: 45%;
}
/*  */
.btn-more {
  width: 100%;
  background: transparent;
  border: 2px dashed #dee2e6;
  margin: 16px 0;
  border-radius: 8px;
  font-size: 14px;
  color: #9d9d9d;
  transition: all 0.2s ease;
}
.btn-more:active {
  background: #dee2e6;
  color: #fff;
}
span img {
  width: 15px;
}
span.text-danger {
  font-size: 13px;
  cursor: pointer;
}
.finish-p {
  background: #f5f5f5;
  border-radius: 5px;
}
.finish-p span {
  position: absolute;
  right: 7%;
  width: 20px;
  cursor: pointer;
}
.actions {
  margin-top: 32px;
}
</style>
