<template>
  <div class="forget-wrapper">
    <div class="forget-wrap">
      <h1>Придумайте новый пароль</h1>
      <form @submit.prevent="" class="form">
        <div class="inp-wrap">
          <span>Новый пароль</span>
          <input
            v-model="password"
            type="password"
            autocomplete=""
            placeholder="Пароль..."
            :class="
              (isEmpty && !password) || isNotMatch ? 'border border-danger' : ''
            "
            @click="cancelEmpty"
          />
        </div>
        <div class="inp-wrap">
          <span>Подтвердите пароль</span>
          <input
            v-model="confirmPassword"
            type="password"
            autocomplete=""
            placeholder="Пароль..."
            :class="
              (isEmpty && !confirmPassword) || isNotMatch
                ? 'border border-danger'
                : ''
            "
          />
        </div>
        <p v-if="isNotMatch" class="text-danger mb-0">Пароль не совпадает</p>
        <button @click="changePassword" class="btn btn-primary">
          Подтвердить
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
      isNotMatch: false,
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    cancelEmpty() {
      this.isEmpty = false;
      this.isNotMatch = false;
    },
    async changePassword() {
      let payload;
      if (!this.password || !this.confirmPassword) {
        this.isEmpty = true;
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.isNotMatch = true;
        return;
      }
      if (localStorage.getItem("userId")) {
        payload = {
          user_id: JSON.parse(localStorage.getItem("userId")),
          new_password: this.password,
          phone_number: JSON.parse(localStorage.getItem("phone-number")),
        };
      } else {
        payload = {
          module_id: JSON.parse(localStorage.getItem("moduleId")),
          new_password: this.password,
          phone_number: JSON.parse(localStorage.getItem("phone-number")),
        };
      }
      try {
        await customAxios.post("api-web-auth/reset-password/", payload);
        this.$router.replace("/sign-in");
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
.forget-wrap {
  margin: 0 1rem;
}
@media (max-width: 576px) {
  h1 {
    font-size: 1.4rem;
  }
}
</style>
