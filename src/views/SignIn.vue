<template>
  <div id="sign-in-wrapper">
    <div class="sign-in">
      <div class="form-img">
        <img src="../assets/edu.png" class="img-fluid" alt="" />
      </div>
      <h2 class="fw-bold">Войти в аккаунт</h2>
      <form @submit.prevent="" class="form">
        <div class="inp-wrap">
          <span>Номер телефона</span>
          <input
            v-model="phoneNumber"
            @input="enforcePhoneFormat()"
            type="tel"
            placeholder="Телефон..."
          />
        </div>
        <div class="inp-wrap">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            placeholder="Пароль..."
            autocomplete=""
          />
        </div>
        <button @click="signIn" class="btn btn-primary">Войти</button>
        <div class="forget">
          <router-link to="/phone">Забыли пароль?</router-link>
        </div>
      </form>
      <!-- <p>Don't have an account yet? <router-link to="/signUp">Sign Up</router-link></p> -->
    </div>
    <img id="left" src="../assets/sign-in-left.svg" alt="" />
    <img id="right" src="../assets/sign-in-right.svg" alt="" />
  </div>
</template>

<script>
import customAxios from "../api";
export default {
  data() {
    return {
      isEmpty: false,
      phoneNumber: "",
      password: "",
    };
  },
  computed: {
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
  },
  methods: {
    async signIn() {
      if (!this.phoneNumber || !this.password) {
        this.isEmpty = true;
        return;
      }
      try {
        const res = await customAxios.post("api-web-auth/login/", {
          phone_number: this.resolvedNumber,
          password: this.password,
        });
        localStorage.setItem("info", JSON.stringify(res.data[0]));
        localStorage.setItem("token", JSON.stringify(res.data[0].token));

        this.$router.replace("/notifications");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
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
  },
  created() {
    this.$Progress.start();
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>

<style scoped>
#sign-in-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}
#left {
  position: absolute;
  height: 100%;
  left: 0;
  object-fit: cover;
}
#right {
  position: absolute;
  height: 100%;
  right: 0;
}
.sign-in {
  width: 450px;
  border-radius: 25px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 3rem;
  padding-bottom: 1rem;
  z-index: 1;
  background: #fff;
  transition: all 0.2s ease-in-out;
}
.form-img {
  display: flex;
  justify-content: center;
}
.form-img img {
  width: 220px;
  margin-bottom: 0.2rem;
}
.sign-in h2 {
  color: #444;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
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
  outline: rgba(67, 97, 238, 1);
  color: rgba(85, 85, 85, 1);
  background: #f6f6f6;
  transition: all 0.3s ease;
}
.form span {
  position: absolute;
  top: 22%;
  left: 1rem;
  color: #b6bccb;
  font-size: 12px;
  transition: all 0.3s ease;
}
input::placeholder {
  font-size: 14px;
  color: rgba(68, 68, 68, 0.7);
}
.form input:hover {
  border: 0.5px solid rgba(67, 97, 238, 1);
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

.sign-in p {
  margin: 0.7rem 0 0.3rem;
  font-size: 0.9rem;
  text-align: center;
}
.sign-in p a {
  color: #4361ee;
  text-decoration: none;
}

.sign-in.red-shadow .form input:focus ~ span,
.sign-in.red-shadow .form input:valid ~ span {
  color: rgb(221, 78, 78);
}
#load {
  position: absolute;
  bottom: 10%;
  left: 50%;
  /* font-size: 30px; */
  /* margin:-60px 0 0 -60px; */
  display: inline-block;
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  /* background: #4361EE; */
}
small {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 0;
  top: 35%;
  cursor: pointer;
}
#error {
  margin: 0;
  text-align: center;
  color: rgb(221, 78, 78);
}
.forget a {
  text-align: left;
  font-size: 15px;
  text-decoration: none;
  color: #4361ee;
  cursor: pointer;
}
.forget a:hover {
  color: rgba(63, 88, 199, 0.8);
}
</style>
