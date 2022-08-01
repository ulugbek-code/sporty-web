<template>
  <div class="create-wrap">
    <div>
      <h1 class="mb-3">Добавить новую группу</h1>
      <form @submit.prevent="" @keydown.enter="saveStudent">
        <div class="d-flex justify-content-between">
          <div class="w-48">
            <module-drop-down
              title="Уровень"
              :options="levels"
              defaultVal="Не Выбрано"
              @input="getLevel"
            ></module-drop-down>
          </div>
          <div class="w-48">
            <module-drop-down
              title="Категория"
              :options="categories"
              defaultVal="Не Выбрано"
              @input="getCategory"
            ></module-drop-down>
          </div>
        </div>
        <div class="inp-wrap">
          <span>Название группы</span>
          <input v-model="groupName" type="text" placeholder="Имя группы..." />
          <div class="icon">
            <img src="../../assets/users.svg" alt="" />
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="inp-wrap w-48">
            <span>Количество уроков в месяц</span>
            <input
              v-model="lessonQty"
              type="number"
              placeholder="Количество уроков..."
            />
            <div class="icon">
              <img src="../../assets/users.svg" alt="" />
            </div>
          </div>
          <div class="inp-wrap w-48">
            <span>Количество учащихся</span>
            <input
              v-model="studentQty"
              type="number"
              placeholder="Kоличество учащихся..."
            />
            <div class="icon">
              <img src="../../assets/one-two.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="inp-wrap w-48">
            <span>Количество свободных мест</span>
            <input
              v-model="limit"
              type="number"
              placeholder="Свободных мест..."
            />
            <div class="icon">
              <img src="../../assets/one-two.svg" alt="" />
            </div>
          </div>
          <div class="inp-wrap w-48">
            <span>Длительность</span>
            <input
              v-model="duration"
              type="number"
              placeholder="В минутах..."
            />
            <div class="icon">
              <img src="../../assets/clock.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="w-48">
            <module-drop-down
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
        const res = await customAxios.get("level/");
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
    await this.getLevels();
    await this.getCategories();
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
.icon img {
  width: 90%;
}
.img-wrap {
  width: 100%;
  height: 140px;
  margin-bottom: 1rem;
}
</style>
