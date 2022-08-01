<template>
  <base-dialog :show="isDelete" @close="closeDelete">
    <template #default>
      <div class="form-task text-center">
        <h4 class="mt-2">Вы действительно хотите удалить?</h4>
      </div>
      <div class="d-flex gap-3 mt-5">
        <button @click="closeDelete" class="w-50 btn btn-danger py-2 px-5">
          Нет
        </button>
        <button
          @click="deleteStudent"
          class="w-50 btn btn-outline-primary py-2 px-5"
        >
          Да
        </button>
      </div>
    </template>
  </base-dialog>
  <div v-if="eachStudent" class="px-3">
    <div class="title d-flex align-items-end gap-4 mb-4">
      <h3 class="fw-bold">
        {{ eachStudent.first_name }} {{ eachStudent.last_name }}
      </h3>
      <p class="text-secondary">
        ID: <span class="text-primary">{{ eachStudent.id }}</span>
      </p>
    </div>
    <div class="content-wrap d-flex mb-3">
      <div>
        <h5>Дата создания</h5>
        <p>{{ formatDate(eachStudent.create_at) }}</p>
      </div>
      <div>
        <h5>Адрес</h5>
        <p>
          {{ eachStudent.address }}
        </p>
      </div>
    </div>
    <div class="content-wrap d-flex mb-3">
      <div>
        <h5>Дата рождения</h5>
        <p>{{ formatDate(eachStudent.birth_date) }}</p>
      </div>
      <div>
        <h5>Телефон</h5>
        <p>{{ formatPhone(eachStudent.phone_number) }}</p>
      </div>
    </div>
    <div class="content-wrap d-flex mb-3">
      <div>
        <h5>Статус</h5>
        <p>
          {{ eachStudent.status === "active" ? "Активный" : "Потенциальный" }}
        </p>
      </div>
      <div>
        <h5>Пол</h5>
        <p>{{ eachStudent.gender === "male" ? "Мужской" : "Женский" }}</p>
      </div>
    </div>
    <div class="logo">
      <img :src="baseUrl + eachStudent.photo" alt="" />
    </div>
    <div class="abs-wrap d-flex gap-2">
      <button @click="triggerUpdate" class="btn btn-primary">Изменить</button>
      <button @click="triggerDelete(eachStudent.id)" class="btn btn-danger">
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import BaseDialog from "../UI/BaseDialog.vue";
export default {
  components: {
    BaseDialog,
  },
  data() {
    return {
      eachStudent: null,
      baseUrl: process.env.VUE_APP_IMAGE_URL,
      isDelete: false,
      deleteId: null,
    };
  },
  computed: {
    each() {
      return this.$store.getters.currentStudent;
    },
  },
  methods: {
    triggerUpdate() {
      this.$store.dispatch("getIsStudent", "update");
    },
    async deleteStudent() {
      try {
        await customAxios.get(`student-erp/delete/?id=${this.deleteId}`);
        this.closeDelete();
        await this.$store.dispatch("getStudentList");
        this.$store.dispatch("getIsStudent", "empty");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    closeDelete() {
      this.isDelete = false;
      this.deleteId = null;
    },
    triggerDelete(val) {
      this.isDelete = true;
      this.deleteId = val;
    },
    formatDate(val) {
      return val.slice(8, 10) + "." + val.slice(5, 7) + "." + val.slice(0, 4);
    },
    formatPhone(val) {
      return (
        "(" +
        val.slice(4, 6) +
        ") " +
        val.slice(6, 9) +
        "-" +
        val.slice(9, 11) +
        "-" +
        val.slice(11, 13)
      );
    },
    async getEachStudent() {
      try {
        const res = await customAxios.get(
          `student-erp/get_details/?id=${this.each}`
        );
        this.eachStudent = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    await this.getEachStudent();
  },
  watch: {
    each() {
      this.getEachStudent();
    },
  },
};
</script>

<style scoped>
h3,
h5,
p {
  margin-bottom: 0;
}
.content-wrap {
  width: 75%;
}
.content-wrap div:first-child {
  flex: 1;
}
.content-wrap div:last-child {
  flex: 2;
}
h5 {
  color: #9aa0ae;
  font-size: 14px;
  margin-bottom: 4px;
}
p {
  font-weight: 600;
}
.abs-wrap {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
.abs-wrap button {
  font-size: 14px;
}
.logo {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
.logo img {
  width: 230px;
  height: 230px;
  border-radius: 50%;
}
</style>
