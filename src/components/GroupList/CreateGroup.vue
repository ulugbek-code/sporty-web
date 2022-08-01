<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Добавить новую группу</h1>
      <form @submit.prevent="" @keydown.enter="saveStudent">
        <div class="d-flex justify-content-between">
          <div class="w-48">
            <module-drop-down
              :isEmpty="isEmpty"
              title="Категория"
              :options="categories"
              defaultVal="Не Выбрано"
              @input="getCategory"
            ></module-drop-down>
          </div>
          <div class="w-48">
            <module-drop-down
              :isEmpty="isEmpty"
              title="Уровень"
              :options="levels"
              defaultVal="Не Выбрано"
              @input="getLevel"
            ></module-drop-down>
          </div>
        </div>
        <div class="inp-wrap" :class="!groupName && isEmpty ? 'error' : ''">
          <span>Название группы</span>
          <input v-model="groupName" type="text" placeholder="Имя группы..." />
          <div class="icon">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 13.75C14.0114 13.75 16.25 11.5114 16.25 8.75C16.25 5.98858 14.0114 3.75 11.25 3.75C8.48858 3.75 6.25 5.98858 6.25 8.75C6.25 11.5114 8.48858 13.75 11.25 13.75Z"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 26.25V23.75C3.75 22.4239 4.27678 21.1521 5.21447 20.2145C6.15215 19.2768 7.42392 18.75 8.75 18.75H13.75C15.0761 18.75 16.3479 19.2768 17.2855 20.2145C18.2232 21.1521 18.75 22.4239 18.75 23.75V26.25"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 3.91251C21.0755 4.18788 22.0288 4.81338 22.7095 5.69039C23.3903 6.56741 23.7598 7.64604 23.7598 8.75626C23.7598 9.86647 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6"
                stroke="#B6BCCB"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26.25 26.25V23.75C26.2437 22.6464 25.8724 21.576 25.1941 20.7055C24.5158 19.835 23.5685 19.2134 22.5 18.9375"
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
            :class="!lessonQty && isEmpty ? 'error' : ''"
          >
            <span>Количество уроков в месяц</span>
            <input
              v-model="lessonQty"
              type="number"
              placeholder="Количество уроков..."
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
          <div
            class="inp-wrap w-48"
            :class="!studentQty && isEmpty ? 'error' : ''"
          >
            <span>Количество учащихся</span>
            <input
              v-model="studentQty"
              type="number"
              placeholder="Kоличество учащихся..."
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
        </div>
        <div class="d-flex justify-content-between">
          <div class="inp-wrap w-48" :class="!limit && isEmpty ? 'error' : ''">
            <span>Количество свободных мест</span>
            <input
              v-model="limit"
              type="number"
              placeholder="Свободных мест..."
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
          <div
            class="inp-wrap w-48"
            :class="!duration && isEmpty ? 'error' : ''"
          >
            <span>Длительность</span>
            <input
              v-model="duration"
              type="number"
              placeholder="В минутах..."
            />
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class=""
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#B6BCCB"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="w-48">
            <module-drop-down
              :isEmpty="isEmpty"
              title="Статус"
              :options="[
                { id: 'full', name: 'Набор закрыт' },
                { id: 'open', name: 'Курс начался' },
                { id: 'waiting', name: 'Идет набор' },
              ]"
              defaultVal="Не Выбрано"
              @input="getStatus"
            ></module-drop-down>
          </div>
          <div class="w-48">
            <module-drop-down
              :isEmpty="isEmpty"
              title="Вид занятий"
              :options="[
                { id: 'group', name: 'Групповые' },
                { id: 'individual', name: 'Индивидуальный' },
              ]"
              defaultVal="Не Выбрано"
              @input="getType"
            ></module-drop-down>
          </div>
        </div>
        <group-date
          :isEmpty="isEmpty"
          :all="groupDates"
          @delDate="deleteDates"
          @updateD="getDates"
        ></group-date>
        <div class="d-flex gap-3">
          <button
            @click="closeCreateGroup"
            class="btn btn-secondary w-50"
            type="button"
          >
            Отмена
          </button>
          <button @click="saveGroup" class="btn btn-primary w-50" type="submit">
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
import GroupDate from "./GroupDate.vue";
export default {
  emits: ["closeAddModule"],
  components: {
    ModuleDropDown,
    GroupDate,
  },
  data() {
    return {
      isEmpty: false,
      groupName: "",
      studentQty: "",
      duration: "",
      limit: "",
      lessonQty: "",
      groupDates: [],
      //
      levels: [],
      categories: [],
      level: null,
      category: null,
      status: null,
      groupType: null,
    };
  },
  computed: {
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
    current() {
      return this.$store.getters.currentGroup;
    },
  },
  methods: {
    getLevel(val) {
      this.level = val;
    },
    async getLevels() {
      try {
        const res = await customAxios.get(
          `level/level_category/?class_id=${this.category}`
        );
        this.levels = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getCategories() {
      try {
        const res = await customAxios.get(
          `class-erp/get/?id=${
            JSON.parse(localStorage.getItem("info"))?.user.id
          }`
        );
        this.categories = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    deleteDates(val) {
      this.groupDates = this.groupDates.filter(
        (date) => date.week[0] != val.week[0]
      );
    },
    getDates(val) {
      let found;
      found = this.groupDates.find((d) => d.week[0] == val.week[0]);
      if (!found) {
        this.groupDates.push(val);
      } else {
        this.groupDates = this.groupDates.map((each) => {
          if (each.week[0] == val.week[0]) {
            return val;
          } else {
            return each;
          }
        });
      }
    },
    closeCreateGroup() {
      if (this.current) {
        this.$store.dispatch("getIsGroup", "details");
      } else {
        this.$store.dispatch("getIsGroup", "empty");
      }
    },
    async saveGroup() {
      if (
        !this.groupName ||
        !this.level ||
        !this.category ||
        !this.lessonQty ||
        !this.studentQty ||
        !this.limit ||
        !this.status ||
        !this.groupType ||
        !this.duration ||
        this.groupDates.length === 0
      ) {
        this.isEmpty = true;
        return;
      }
      try {
        const res = await customAxios.post("group-erp/post/", {
          group: {
            level_id: this.level,
            module_id: JSON.parse(localStorage.getItem("info"))?.user.id,
            clas_id: this.category,
            name: this.groupName,
            number_of_lessons_per_month: this.lessonQty,
            current_students_number: this.studentQty,
            limit: this.limit,
            status: this.status,
            type_group: this.groupType,
            duration: this.duration,
          },
          group_time: this.groupDates,
        });

        await this.$store.dispatch("getCurrentGroup", res.data.id);
        await this.$store.dispatch("getGroupList");
        this.closeCreateGroup();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    getCategory(val) {
      this.category = val;
    },
    getStatus(val) {
      this.status = val;
    },
    getType(val) {
      this.groupType = val;
    },
  },
  async created() {
    await this.getCategories();
  },
  watch: {
    category() {
      this.getLevels();
    },
  },
};
</script>

<style scoped>
.create-wrap {
  width: 100%;
  overflow: auto;
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
.error svg circle,
.error svg polyline {
  stroke: #ea4335;
}
</style>
