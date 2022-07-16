<template>
  <div class="forget-wrapper">
    <div class="forget-wrap">
      <h1>Подтвердите номер</h1>
      <p><span>Код был отправлен на номер</span> {{ hiddenPhone }}</p>
      <form @submit.prevent="" class="text-center">
        <input
          v-model="val1"
          type="number"
          min="0"
          max="9"
          id="input-1"
          class="code"
          :class="val1 ? 'bm' : ''"
        />
        <input
          v-model="val2"
          type="number"
          min="0"
          max="9"
          id="input-2"
          class="code"
          :class="val2 !== '' ? 'bm' : ''"
        />
        <input
          v-model="val3"
          type="number"
          min="0"
          max="9"
          id="input-3"
          class="code"
          :class="val3 ? 'bm' : ''"
        />
        <input
          v-model="val4"
          type="number"
          min="0"
          max="9"
          id="input-4"
          class="code"
          :class="val4 ? 'bm' : ''"
        />
        <div class="d-grid mt-5">
          <button
            @click="setNewPass"
            class="btn btn-primary code"
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
      if (this.phoneNumber) {
        return (
          this.phoneNumber.slice(0, 4) +
          " ** *** " +
          this.phoneNumber.slice(9, 11) +
          " " +
          this.phoneNumber.slice(11, 13)
        );
      } else return null;
    },
    isFull() {
      return !this.val1 || !this.val2 || !this.val3 || !this.val4;
    },
    fullValue() {
      return "" + this.val1 + this.val2 + this.val3 + this.val4;
    },
  },
  methods: {
    async setNewPass() {
      try {
        const res = await customAxios.post("api-web-auth/register/", {
          code: this.fullValue,
        });
        localStorage.setItem("userId", JSON.stringify(res.data.user.id));
        this.$router.replace("/new-password");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
        // Неверный смс-код
      }
    },
  },
  mounted() {
    const codes = document.querySelectorAll(".code");

    codes[0].focus();

    codes.forEach((code, idx) => {
      code.addEventListener("keydown", (e) => {
        if (e.key >= 0 && e.key <= 9 && codes[idx + 1] !== undefined) {
          codes[idx].value = "";
          setTimeout(() => codes[idx + 1].focus(), 10);
        } else if (e.key === "Backspace" && codes[idx - 1] !== undefined) {
          setTimeout(() => codes[idx - 1].focus(), 10);
        }
      });
    });
  },
  // watch: {
  //   val1(val) {
  //     if (val) {
  //       document.getElementById("input-2").focus();
  //     }
  //   },
  //   val2(val) {
  //     if (val === "a") {
  //       document.getElementById("input-1").focus();
  //     } else if (val) {
  //       document.getElementById("input-3").focus();
  //     } else {
  //       document.getElementById("input-1").focus();
  //     }
  //   },
  //   val3(val) {
  //     if (val) {
  //       document.getElementById("input-4").focus();
  //     } else {
  //       document.getElementById("input-2").focus();
  //     }
  //   },
  //   val4(val) {
  //     if (!val) {
  //       document.getElementById("input-3").focus();
  //     }
  //   },
  // },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
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
