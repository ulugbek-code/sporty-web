<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Добавить нового студента</h1>
      <form @submit.prevent="" @keydown.enter="saveStudent">
        <div class="d-flex justify-content-between">
          <div
            class="inp-wrap w-48"
            :class="!firstName && isEmpty ? 'error' : ''"
          >
            <span>Имя</span>
            <input
              v-model="firstName"
              type="text"
              placeholder="Имя студента..."
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
                  d="M12.9998 11.9167C15.3931 11.9167 17.3332 9.97657 17.3332 7.58333C17.3332 5.1901 15.3931 3.25 12.9998 3.25C10.6066 3.25 8.6665 5.1901 8.6665 7.58333C8.6665 9.97657 10.6066 11.9167 12.9998 11.9167Z"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.5 22.75V20.5833C6.5 19.4341 6.95655 18.3319 7.7692 17.5192C8.58186 16.7065 9.68406 16.25 10.8333 16.25H15.1667C16.3159 16.25 17.4181 16.7065 18.2308 17.5192C19.0435 18.3319 19.5 19.4341 19.5 20.5833V22.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            class="inp-wrap w-48"
            :class="!lastName && isEmpty ? 'error' : ''"
          >
            <span>Фамилия</span>
            <input
              v-model="lastName"
              type="text"
              placeholder="Фамилия студента..."
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
                  d="M12.9998 11.9167C15.3931 11.9167 17.3332 9.97657 17.3332 7.58333C17.3332 5.1901 15.3931 3.25 12.9998 3.25C10.6066 3.25 8.6665 5.1901 8.6665 7.58333C8.6665 9.97657 10.6066 11.9167 12.9998 11.9167Z"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.5 22.75V20.5833C6.5 19.4341 6.95655 18.3319 7.7692 17.5192C8.58186 16.7065 9.68406 16.25 10.8333 16.25H15.1667C16.3159 16.25 17.4181 16.7065 18.2308 17.5192C19.0435 18.3319 19.5 19.4341 19.5 20.5833V22.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="w-48">
            <module-drop-down
              :isEmpty="isEmpty"
              title="Пол"
              :options="[
                { id: 'male', name: 'Мужской' },
                { id: 'female', name: 'Женский' },
              ]"
              defaultVal="Не Выбрано"
              @input="getGender"
            ></module-drop-down>
          </div>
          <div
            class="inp-wrap date-wrap w-48"
            :class="!dateOfBirth && isEmpty ? 'error' : ''"
          >
            <span>Дата рождения</span>
            <input
              v-model="dateOfBirth"
              type="date"
              :class="!dateOfBirth ? 'default-color' : ''"
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
                  d="M14.7438 26.25H6.25C5.58696 26.25 4.95107 25.9866 4.48223 25.5178C4.01339 25.0489 3.75 24.413 3.75 23.75V8.75C3.75 8.08696 4.01339 7.45107 4.48223 6.98223C4.95107 6.51339 5.58696 6.25 6.25 6.25H21.25C21.913 6.25 22.5489 6.51339 23.0178 6.98223C23.4866 7.45107 23.75 8.08696 23.75 8.75V13.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.5 27.5C25.2614 27.5 27.5 25.2614 27.5 22.5C27.5 19.7386 25.2614 17.5 22.5 17.5C19.7386 17.5 17.5 19.7386 17.5 22.5C17.5 25.2614 19.7386 27.5 22.5 27.5Z"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.75 3.75V8.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 3.75V8.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 13.75H23.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.5 20.62V22.5L23.75 23.75"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="inp-wrap" :class="!address && isEmpty ? 'error' : ''">
          <span>Адрес</span>
          <input
            v-model="address"
            type="text"
            placeholder="Адрес студента..."
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
                d="M11.731 10.647C12.3371 10.041 12.75 9.2689 12.9173 8.42828C13.0846 7.58766 12.9989 6.7163 12.6709 5.92441C12.343 5.13252 11.7876 4.45567 11.0749 3.97946C10.3623 3.50325 9.52443 3.24907 8.66732 3.24907C7.81021 3.24907 6.97235 3.50325 6.25971 3.97946C5.54707 4.45567 4.99166 5.13252 4.66372 5.92441C4.33578 6.7163 4.25004 7.58766 4.41735 8.42828C4.58465 9.2689 4.99749 10.041 5.60365 10.647L8.66732 13.7117L11.731 10.647Z"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.66602 7.58333V7.59416"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.397 19.3137C21.0032 18.7077 21.416 17.9356 21.5833 17.0949C21.7506 16.2543 21.6649 15.383 21.3369 14.5911C21.009 13.7992 20.4536 13.1223 19.7409 12.6461C19.0283 12.1699 18.1904 11.9157 17.3333 11.9157C16.4762 11.9157 15.6384 12.1699 14.9257 12.6461C14.2131 13.1223 13.6577 13.7992 13.3297 14.5911C13.0018 15.383 12.9161 16.2543 13.0834 17.0949C13.2507 17.9356 13.6635 18.7077 14.2697 19.3137L17.3333 22.3784L20.397 19.3137Z"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.334 16.25V16.2608"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div
            class="inp-wrap w-48"
            :class="!phoneNumber && isEmpty ? 'error' : ''"
          >
            <span>Телефон</span>
            <input
              v-model="phoneNumber"
              @input="enforcePhoneFormat()"
              type="tel"
              placeholder="Телефон студента..."
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
                  d="M5.41667 4.33333H9.75L11.9167 9.75L9.20833 11.375C10.3685 13.7275 12.2725 15.6315 14.625 16.7917L16.25 14.0833L21.6667 16.25V20.5833C21.6667 21.158 21.4384 21.7091 21.0321 22.1154C20.6257 22.5217 20.0746 22.75 19.5 22.75C15.2742 22.4932 11.2885 20.6987 8.2949 17.7051C5.3013 14.7115 3.5068 10.7258 3.25 6.5C3.25 5.92536 3.47827 5.37426 3.8846 4.96793C4.29093 4.56161 4.84203 4.33333 5.41667 4.33333"
                  stroke="#B6BCCB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="w-48">
            <module-drop-down
              :isEmpty="isEmpty"
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
          <image-upload
            :isEmpty="isEmpty"
            @input="addImage"
            @r-input="removeImg"
          ></image-upload>
        </div>
        <div class="d-flex gap-3">
          <button
            @click="closeCreateStudent"
            class="btn btn-secondary w-50"
            type="button"
          >
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
      isEmpty: false,
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
      if (
        !this.firstName ||
        !this.lastName ||
        !this.phoneNumber ||
        !this.dateOfBirth ||
        !this.image ||
        !this.gender ||
        !this.status ||
        !this.address
      ) {
        this.isEmpty = true;
        return;
      }
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
.icon svg {
  width: 90%;
}
.img-wrap {
  width: 100%;
  height: 140px;
  margin-bottom: 1rem;
}
.error span {
  color: #ea4335;
}
</style>
