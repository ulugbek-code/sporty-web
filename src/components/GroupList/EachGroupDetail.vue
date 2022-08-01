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
          @click="deleteGroup"
          class="w-50 btn btn-outline-primary py-2 px-5"
        >
          Да
        </button>
      </div>
    </template>
  </base-dialog>
  <div v-if="eachGroup">
    <div class="title d-flex align-items-end gap-4 mb-4">
      <h3>{{ eachGroup.name }}</h3>
      <p class="text-secondary">
        ID: <span class="text-primary">{{ eachGroup.id }}</span>
      </p>
    </div>
    <div class="d-flex">
      <div class="first">
        <div class="sub-title d-flex mb-3">
          <div>
            <h5>Модуль:</h5>
            <p>{{ eachGroup.class_name }}</p>
          </div>
          <div>
            <h5>Статус:</h5>
            <p>
              {{
                eachGroup.status === "full"
                  ? "Набор закрыт"
                  : eachGroup.status === "open"
                  ? "Курс начался"
                  : "Идет набор"
              }}
            </p>
          </div>
          <div>
            <h5>Количество студентов:</h5>
            <p>{{ eachGroup.current_students_number }}</p>
          </div>
          <div>
            <h5>Уровень:</h5>
            <p>{{ eachGroup.level_name }}</p>
          </div>
        </div>
        <div class="sub-title d-flex mb-3">
          <div>
            <h5>Дата создания:</h5>
            <p>{{ formatDate(eachGroup.create_at) }}</p>
          </div>
          <div>
            <h5>Вид занятий:</h5>
            <p>
              {{
                eachGroup.type_group === "individual"
                  ? "Индивидуальный"
                  : "Групповые"
              }}
            </p>
          </div>
          <div>
            <h5>Свободных мест в группе:</h5>
            <p>{{ eachGroup.limit }}</p>
          </div>
          <div>
            <h5>Количество уроков в месяц:</h5>
            <p>
              {{
                eachGroup.number_of_lessons_per_month
                  ? eachGroup.number_of_lessons_per_month
                  : "-"
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="abs">
        <h5>Расписание:</h5>
        <p v-for="grDate in eachGroup.group_date" :key="grDate.id">
          <span>{{ setWeek(grDate.week[0]) }}</span>
          {{ grDate.start_date?.slice(0, 5) }} -
          {{ grDate.finish_date?.slice(0, 5) }}
        </p>
      </div>
    </div>
    <div class="lvl-btn d-flex justify-content-between mb-4">
      <button @click="showGroups = !showGroups" class="btn">
        Студенты
        <span class="polygon" :class="showGroups ? 'active-bg' : ''"></span>
      </button>
      <button @click="triggerStudent" class="btn btn-primary">
        Добавить студентов
      </button>
    </div>
    <all-groups
      v-if="showGroups"
      :students="students"
      :grId="eachGroup.id"
      @updStudent="getGroupStudents"
    ></all-groups>
    <div class="abs-wrap d-flex gap-2">
      <button @click="triggerUpdate" class="btn btn-primary">Изменить</button>
      <button @click="triggerDelete(eachGroup.id)" class="btn btn-danger">
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import customAxios from "../../api";
import BaseDialog from "../UI/BaseDialog.vue";
import AllGroups from "./AllGroups.vue";
export default {
  emits: ["updateGr"],
  components: {
    BaseDialog,
    AllGroups,
  },
  data() {
    return {
      showGroups: true,
      eachGroup: null,
      isDelete: false,
      deleteId: null,
      students: [],
      weeks: ["NOT", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    };
  },
  computed: {
    each() {
      return this.$store.getters.currentGroup;
    },
  },
  methods: {
    setWeek(val) {
      return this.weeks.find((week, index) => index == val);
    },
    triggerUpdate() {
      this.$emit("updateGr", this.eachGroup);
      this.$store.dispatch("getIsGroup", "update");
    },
    triggerStudent() {
      this.$emit("updateGr", this.eachGroup);
      this.$store.dispatch("getIsGroup", "student");
    },
    closeDelete() {
      this.isDelete = false;
      this.deleteId = null;
    },
    triggerDelete(val) {
      this.isDelete = true;
      this.deleteId = val;
    },
    async deleteGroup() {
      try {
        await customAxios.get(`group-erp/delete/?id=${this.deleteId}`);
        this.closeDelete();
        await this.$store.dispatch("getGroupList");
        this.$store.dispatch("getIsGroup", "empty");
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    formatDate(val) {
      return val.slice(8, 10) + "." + val.slice(5, 7) + "." + val.slice(0, 4);
    },
    async getGroupStudents() {
      try {
        const res = await customAxios.get(
          `group-erp/get_students/?group_id=${this.eachGroup.id}`
        );
        this.students = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    async getEachGroup() {
      try {
        const res = await customAxios.get(
          `group-erp/get_details/?id=${this.each}`
        );
        this.eachGroup = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    if (this.each) {
      await this.getEachGroup();
      // await this.getGroupStudents();
    }
  },
  watch: {
    async each(val) {
      if (val) await this.getEachGroup();
    },
    async eachGroup() {
      await this.getGroupStudents();
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

.abs-wrap {
  position: absolute;
  top: 1rem;
  right: 2rem;
}
.abs-wrap button {
  font-size: 14px;
}

/*  */
.sub-title div {
  flex: 1;
}
h5 {
  font-size: 14px;
  font-weight: 500;
  color: #9aa0ae;
  margin-bottom: 2px;
}
p {
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
}
.lvl-btn button:first-child {
  background: #9aa0ae;
  color: #fff;
  font-size: 14px;
  transition: all 0.2s ease;
}
.lvl-btn button:last-child {
  font-size: 14px;
  border-radius: 5px;
}
.lvl-btn button:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.polygon {
  position: relative;
}
.polygon:after {
  position: relative;
  content: "";
  transition: all 0.3s ease;
  margin-left: 12px;
  top: 12px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}
.polygon.active-bg:after {
  border-color: transparent transparent #fff transparent;
  top: -10px;
}
.first {
  width: 70%;
}
.abs {
  width: 30%;
}
</style>
