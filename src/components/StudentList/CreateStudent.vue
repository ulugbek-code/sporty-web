<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Добавить нового студента</h1>
      <form @submit.prevent="" @keydown.enter="saveStudent">
        <div class="d-flex justify-content-between">
          <div class="inp-wrap w-48">
            <span>Имя</span>
            <input
              v-model="firstName"
              type="text"
              placeholder="Имя студента..."
            />
            <div class="icon">
              <img src="../../assets/user.svg" alt="" />
            </div>
          </div>
          <div class="inp-wrap w-48">
            <span>Фамилия</span>
            <input
              v-model="lastName"
              type="text"
              placeholder="Фамилия студента..."
            />
            <div class="icon">
              <img src="../../assets/user.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="w-48">
            <module-drop-down
              title="Пол"
              :options="[
                { id: 'male', name: 'Мужской' },
                { id: 'female', name: 'Женский' },
              ]"
              defaultVal="Не Выбрано"
              @input="getGender"
            ></module-drop-down>
          </div>
          <div class="inp-wrap date-wrap w-48">
            <span>Дата рождения</span>
            <input
              v-model="dateOfBirth"
              type="date"
              :class="!dateOfBirth ? 'default-color' : ''"
            />
            <div class="icon">
              <img src="../../assets/calendar.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="inp-wrap">
          <span>Адрес</span>
          <input
            v-model="address"
            type="text"
            placeholder="Адрес студента..."
          />
          <div class="icon">
            <img src="../../assets/location.svg" alt="" />
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="inp-wrap w-48">
            <span>Телефон</span>
            <input
              v-model="phoneNumber"
              @input="enforcePhoneFormat()"
              type="tel"
              placeholder="Телефон студента..."
            />
            <div class="icon">
              <img src="../../assets/phone-icon.svg" alt="" />
            </div>
          </div>
          <div class="w-48">
            <module-drop-down
              title="Статус"
              :options="[
                { id: 'active', name: 'Активный' },
                { id: 'potential', name: 'Потенциальный' },
              ]"
              defaultVal="Не Выбрано"
              @input="getStatus"
            ></module-drop-down>
          </div>
        </div>
        <div class="img-wrap">
          <image-upload @input="addImage" @r-input="removeImg"></image-upload>
        </div>
        <div class="d-flex gap-3">
          <button @click="closeCreateStudent" class="btn btn-secondary w-50">
            Отмена
          </button>
          <button @click="saveStudent" class="btn btn-primary w-50">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import ModuleDropDown from "../ModuleList/ModuleDropDown.vue";
import ImageUpload from "./ImageUpload.vue";
export default {
  emits: ["closeAddModule"],
  components: {
    ModuleDropDown,
    ImageUpload,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      status: "",
      phoneNumber: "",
      moduleId: "",
      image: null,
    };
  },
  computed: {
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
    current() {
      return this.$store.getters.currentStudent;
    },
    isFull() {
      return !this.className || !this.description || !this.category;
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
    addImage(val) {
      if (!val.name) return;
      this.image = val;
    },
    removeImg() {
      this.image = null;
    },
    closeCreateStudent() {
      if (this.current) {
        this.$store.dispatch("getIsStudent", "details");
      } else {
        this.$store.dispatch("getIsStudent", "empty");
      }
    },
    async saveStudent() {
      try {
        let formData = new FormData();

        formData.append("first_name", this.firstName);
        formData.append("last_name", this.lastName);
        formData.append("username", this.resolvedNumber);
        formData.append("phone_number", this.resolvedNumber);
        formData.append("password", this.resolvedNumber);
        formData.append("birth_date", this.dateOfBirth);
        formData.append("photo", this.image);
        formData.append(
          "module",
          JSON.parse(localStorage.getItem("info"))?.user.id
        );
        formData.append("gender", this.gender);
        formData.append("status", this.status);
        formData.append("address", this.address);

        const res = await customAxios.post("student-erp/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await this.$store.dispatch("getCurrentStudent", res.data.id);
        await this.$store.dispatch("getStudentList");
        this.closeCreateStudent();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    getGender(val) {
      this.gender = val;
    },
    getStatus(val) {
      this.status = val;
    },
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
.w-48 {
  width: 48%;
}
.inp-wrap span {
  color: #b6bccb;
  font-size: 13px;
  font-weight: 600;
  top: 4px;
  left: 10px;
  position: absolute;
}
.inp-wrap input,
.inp-wrap textarea {
  padding: 4px;
  background: none;
  border: none;
  outline: none;
  width: 90%;
  font-size: 15px;
}
.date-wrap input {
  width: 100%;
}
.inp-wrap textarea {
  resize: none;
  padding-bottom: 1rem;
}
input::placeholder,
textarea::placeholder,
.default-color {
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
.icon {
  position: absolute;
  right: 8px;
  top: 12px;
}
.date-wrap .icon {
  top: 1.1rem;
  pointer-events: none;
  background: #f6f6f6;
}
.icon img {
  width: 90%;
}
.img-wrap {
  width: 100%;
  height: 140px;
  margin-bottom: 1rem;
}
</style>
