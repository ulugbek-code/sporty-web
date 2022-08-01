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
        <div
          class="inp-wrap date-wrap"
          :class="!startDate && isEmpty ? 'error' : ''"
        >
          <span>Дата начала</span>
          <input
            v-model="startDate"
            type="date"
            :class="!startDate ? 'default-color' : ''"
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
        <div
          class="inp-wrap date-wrap"
          :class="!finishDate && isEmpty ? 'error' : ''"
        >
          <span>Дата окончания</span>
          <input
            v-model="finishDate"
            type="date"
            :class="!finishDate ? 'default-color' : ''"
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
        <div class="inp-wrap" :class="!attendance && isEmpty ? 'error' : ''">
          <span>Присутствие</span>
          <input
            v-model="attendance"
            type="number"
            placeholder="Присутствие..."
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
                d="M11.917 6.5H21.667"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.917 13H21.667"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 19.5H21.6667"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.33301 17.3333C4.33301 16.7587 4.56128 16.2076 4.96761 15.8013C5.37394 15.3949 5.92504 15.1667 6.49967 15.1667C7.07431 15.1667 7.62541 15.3949 8.03174 15.8013C8.43807 16.2076 8.66634 16.7587 8.66634 17.3333C8.66634 17.9736 8.12467 18.4167 7.58301 18.9583L4.33301 21.6667H8.66634"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.49967 10.8333V4.33334L4.33301 6.5"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
        <p>Oставшаяся посещаемость:</p>
        <h6>{{ student.remaining_attendance }}</h6>
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
      isEmpty: false,
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
      this.isEmpty = false;
      this.userId = null;
      this.startDate = "";
      this.finishDate = "";
      this.attendance = "";
    },
    triggerRotate(id) {
      this.isRotate = true;
      this.userId = id;
    },
    async postRotate() {
      if (!this.startDate || !this.finishDate || !this.attendance) {
        this.isEmpty = true;
        return;
      }
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
.icon svg {
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
.error span {
  color: #ea4335;
}
/*  */
</style>
