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
  <base-dialog :show="isRotate" @close="closeRotate" :zIndex="true">
    <template #default>
      <form class="form-task">
        <div class="inp-wrap date-wrap">
          <span>Дата начала</span>
          <input
            v-model="startDate"
            type="date"
            :class="!startDate ? 'default-color' : ''"
          />
          <div class="icon">
            <img src="../../assets/calendar.svg" alt="" />
          </div>
        </div>
        <div class="inp-wrap date-wrap">
          <span>Дата окончания</span>
          <input
            v-model="finishDate"
            type="date"
            :class="!finishDate ? 'default-color' : ''"
          />
          <div class="icon">
            <img src="../../assets/calendar.svg" alt="" />
          </div>
        </div>
        <div class="inp-wrap">
          <span>Присутствие</span>
          <input
            v-model="attendance"
            type="number"
            placeholder="Присутствие..."
          />
          <div class="icon">
            <img src="../../assets/one-two.svg" alt="" />
          </div>
        </div>
      </form>
      <div class="d-flex gap-3">
        <button
          @click="closeRotate"
          class="w-50 btn btn-secondary py-2 px-5"
          type="button"
        >
          Отмена
        </button>
        <button
          @click="postRotate"
          class="w-50 btn btn-primary py-2 px-5"
          type="submit"
        >
          Сохранить
        </button>
      </div>
      <!--  -->
      <!-- <div class="d-flex gap-3 mt-4">
        <button
          @click="closeRotate"
          class="w-50 btn btn-danger py-2 px-5"
          type="button"
        >
          Нет
        </button>
        <button
          @click="postRotate"
          class="w-50 btn btn-outline-primary py-2 px-5"
          type="submit"
        >
          Да
        </button>
      </div> -->
    </template>
  </base-dialog>
  <div class="each-lvl">
    <div
      class="each d-flex justify-content-between align-items-center p-4"
      :class="
        student.remaining_attendance <= 0
          ? 'red-back'
          : student.remaining_attendance == 1
          ? 'pure-red'
          : student.remaining_attendance == 2
          ? 'yellow-back'
          : ''
      "
    >
      <div class="with-border">
        <h6>{{ student.first_name }} {{ student.last_name }}</h6>
        <p>
          ID: <span class="text-primary">{{ student.id }}</span>
        </p>
      </div>
      <div>
        <p>Телефон:</p>
        <h6>{{ formatPhone(student.phone_number) }}</h6>
      </div>
      <div>
        <p>Статус:</p>
        <h6 :class="student.is_active ? 'text-success' : 'text-danger'">
          {{ student.is_active ? "Активный" : "Неактивный" }}
        </h6>
      </div>
      <div>
        <p>Посещаемость:</p>
        <h6>{{ student.total_attendance }}</h6>
      </div>
      <div>
        <p>Всего уроков:</p>
        <h6>{{ student.total_lessons }}</h6>
      </div>
      <div>
        <span @click="triggerRotate(student.id)" class="rotate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#B6BCCB"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>
        </span>
      </div>
      <div>
        <span @click="triggerDelete(student.id)" class="delete"
          ><svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 0.5L0.5 9.5M0.5 0.5L9.5 9.5"
              stroke="#B6BCCB"
              stroke-linecap="round"
              stroke-width="1.5"
            /></svg
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDialog from "../UI/BaseDialog.vue";
import customAxios from "../../api";
export default {
  props: ["student", "groupId"],
  emits: ["updateStudent"],
  components: {
    BaseDialog,
  },
  data() {
    return {
      isDelete: false,
      deleteId: null,
      isRotate: false,
      userId: null,
      startDate: "",
      finishDate: "",
      attendance: "",
    };
  },
  methods: {
    closeRotate() {
      this.isRotate = false;
      this.userId = null;
    },
    triggerRotate(id) {
      this.isRotate = true;
      this.userId = id;
    },
    async postRotate() {
      try {
        await customAxios.post("subscription/", {
          start_date: this.startDate,
          finish_date: this.finishDate,
          is_paid: true,
          group: this.groupId,
          user: this.userId,
          attendance: this.attendance,
        });
        this.$emit("updateStudent");
        this.closeRotate();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async deleteStudent() {
      try {
        await customAxios.get(
          `group-erp/remove_student/?group_id=${this.groupId}&user_id=${this.deleteId}`
        );
        this.$emit("updateStudent");
        this.closeDelete();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    triggerDelete(id) {
      this.isDelete = true;
      this.deleteId = id;
    },
    closeDelete() {
      this.isDelete = false;
      this.deleteId = null;
    },
    formatPhone(val) {
      return (
        "(" +
        val.slice(4, 6) +
        ") " +
        val.slice(6, 9) +
        " " +
        val.slice(9, 11) +
        " " +
        val.slice(11, 13)
      );
    },
  },
};
</script>

<style scoped>
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
.date-wrap input {
  width: 100%;
}
input::placeholder,
.default-color {
  color: #868789;
}
.icon {
  /* background: red; */
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
/*  */
.form-task {
  min-width: 350px;
}
.each-lvl {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
}
.each {
  border-radius: 10px;
}
.each-lvl .each {
  width: 100%;
}
.each div {
  flex: 1;
}
.each div:first-child {
  margin-right: 2rem;
}
.with-border {
  border-right: 2px solid #eaeaea;
}
h6,
p {
  margin-bottom: 0;
}
h6 {
  font-weight: 600;
  font-size: 14px;
}
p {
  color: #9aa0ae;
  font-size: 13px;
}
span svg path {
  transition: all 0.2s ease;
}
.delete,
.rotate {
  cursor: pointer;
}
.delete:hover svg path {
  stroke: #dc3545;
}
.rotate:hover svg path,
.red-back .delete:hover svg path,
.pure-red .delete:hover svg path {
  stroke: #444;
}
.red-back {
  background: #d62f40;
}
.pure-red {
  background: #f5495a;
}
.yellow-back {
  background: rgb(247, 209, 43);
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
/*  */
</style>
