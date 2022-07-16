<template>
  <div class="forget-wrapper">
    <div class="forget-wrap">
      <h1>Подтвердите номер</h1>
      <p><span>Код был отправлен на номер</span> {{ hiddenPhone }}</p>
      <form @submit.prevent="" class="text-center">
        <input
          v-model="val1"
          type="text"
          id="input-1"
          :class="val1 ? 'bm' : ''"
          maxlength="1"
        />
        <input
          v-model="val2"
          type="text"
          id="input-2"
          :class="val2 ? 'bm' : ''"
          maxlength="1"
        />
        <input
          v-model="val3"
          type="text"
          id="input-3"
          :class="val3 ? 'bm' : ''"
          maxlength="1"
        />
        <input
          v-model="val4"
          type="text"
          id="input-4"
          :class="val4 ? 'bm' : ''"
          maxlength="1"
        />
        <div class="d-grid mt-5">
          <button
            @click="setNewPass"
            class="btn btn-primary"
            :disabled="isFull"
          >
            Подтвердить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import customAxios from "../api";
export default {
  data() {
    return {
      val1: "",
      val2: "",
      val3: "",
      val4: "",
      phoneNumber: JSON.parse(localStorage.getItem("phone-number")),
    };
  },
  computed: {
    hiddenPhone() {
      return (
        this.phoneNumber.slice(0, 4) +
        " ** *** " +
        this.phoneNumber.slice(9, 11) +
        " " +
        this.phoneNumber.slice(11, 13)
      );
    },
    isFull() {
      return !this.val1 || !this.val2 || !this.val3 || !this.val4;
    },
    fullValue() {
      return this.val1 + this.val2 + this.val3 + this.val4;
    },
  },
  methods: {
    // deleteVal(e, val) {
    //   if (e.code === "Backspace" && val === 2) {
    //     document.getElementById("input-1").focus();
    //   } else if (e.code === "Backspace" && val === 3) {
    //     document.getElementById("input-2").focus();
    //   } else if (e.code === "Backspace" && val === 4) {
    //     document.getElementById("input-3").focus();
    //   }
    async setNewPass() {
      try {
        const res = await customAxios.post("api-web-auth/register/", {
          code: this.fullValue,
        });
        localStorage.setItem("userId", JSON.stringify(res.data.user.id));
        this.$router.replace("/new-password");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  watch: {
    val1(val) {
      if (val) {
        document.getElementById("input-2").focus();
      }
    },
    val2(val) {
      if (val) {
        document.getElementById("input-3").focus();
      } else {
        document.getElementById("input-1").focus();
      }
    },
    val3(val) {
      if (val) {
        document.getElementById("input-4").focus();
      } else {
        document.getElementById("input-2").focus();
      }
    },
    val4(val) {
      if (!val) {
        document.getElementById("input-3").focus();
      }
    },
  },
};
</script>

<style scoped>
.forget-wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/reset-password.svg") no-repeat center;
  background-size: cover;
}

/* #right {
  position: absolute;
  height: 100%;
  right: 0;
} */
.forget-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
h1 {
  font-weight: 900;
  margin-bottom: 1rem;
}
input {
  height: 4rem;
  width: 4rem;
  font-size: 3rem;
  border: none;
  border-bottom: 3px solid #b6bccb;
  margin: 0 4px;
  text-align: center;
  outline: none;
}
input.bm {
  border-bottom: 3px solid #1b1b1d;
}
span {
  color: #b6bccb;
  font-size: 14px;
}
</style>
