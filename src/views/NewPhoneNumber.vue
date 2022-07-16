<template>
  <div class="forget-wrapper">
    <div class="forget-wrap">
      <h1>Напишите свой номер телефона</h1>
      <form @submit.prevent="" class="form">
        <div class="inp-wrap">
          <span>Номер телефона</span>
          <input
            v-model="phoneNumber"
            @input="enforcePhoneFormat()"
            type="tel"
            placeholder="телефон..."
            :class="isEmpty && !phoneNumber ? 'border border-danger' : ''"
            @click="cancelEmpty"
          />
        </div>
        <button @click="sendPhoneNumber" class="btn btn-primary">
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import customAxios from "../api";
export default {
  data() {
    return {
      isEmpty: false,
      phoneNumber: "",
    };
  },
  computed: {
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
  },
  methods: {
    enforcePhoneFormat() {
      let x = this.phoneNumber
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.phoneNumber = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      if (this.phoneNumber.length > 11) {
        this.phoneNumber =
          this.phoneNumber.substring(0, 11) +
          "-" +
          this.phoneNumber.substring(11);
      }
    },
    cancelEmpty() {
      this.isEmpty = false;
    },
    async sendPhoneNumber() {
      if (!this.phoneNumber) {
        this.isEmpty = true;
        return;
      }
      try {
        const res = await customAxios.post("api-web-auth/send_sms/", {
          phone_number: this.resolvedNumber,
        });
        localStorage.setItem(
          "phone-number",
          JSON.stringify(res.data.phone_number)
        );
        this.$router.replace("/forget");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 900;
  margin-bottom: 1rem;
}
.forget-wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/confirm-phone.svg") no-repeat center;
  background-size: cover;
}
#left {
  position: absolute;
  height: 100%;
  left: 0;
}
#right {
  position: absolute;
  height: 100%;
  right: 0;
}
.form {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}
.form div {
  position: relative;
}
.inp-wrap {
  position: relative;
}
.form input {
  width: 100%;
  height: 55px;
  margin: 6px 0;
  padding: 1.4rem 1rem 0.6rem;
  border: 0.5px solid rgba(67, 97, 238, 0.35);
  border-radius: 10px;
  outline: #4285f4;
  color: rgba(85, 85, 85, 1);
  background: #f6f6f6;
  transition: all 0.3s ease;
}
.form span {
  position: absolute;
  top: 18%;
  left: 1rem;
  color: #b6bccb;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
}
input::placeholder {
  font-size: 14px;
  color: rgba(68, 68, 68, 0.7);
}
.form input:hover {
  border: 0.5px solid #4285f4;
}
.inp-wrap:hover > span {
  color: #4285f4;
}
.btn {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 12px;
  padding: 0.6rem 1.2rem;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  border: 1px solid rgba(67, 97, 238, 1);
}
input.border-danger::placeholder {
  color: #dc3545;
}
@media (max-width: 576px) {
  h1 {
    font-size: 1.3rem;
  }
  .forget-wrap {
    margin: 0 1rem;
  }
}
</style>
