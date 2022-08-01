<template>
  <div class="create-wrap">
    <h1 class="text-center mb-3">Обновить группу</h1>
    <form @submit.prevent="" @keydown.enter="saveStudent">
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
          <input v-model="duration" type="number" placeholder="В минутах..." />
          <div class="icon">
            <img src="../../assets/clock.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="w-48">
          <module-drop-down
            :edit="true"
            title="Статус"
            :options="[
              { id: 'full', name: 'Набор закрыт' },
              { id: 'open', name: 'Курс начался' },
              { id: 'waiting', name: 'Идет набор' },
            ]"
            :defaultVal="
              this.status === 'full'
                ? 'Набор закрыт'
                : this.status === 'open'
                ? 'Курс начался'
                : 'Идет набор'
            "
            @input="getStatus"
          ></module-drop-down>
        </div>
        <div class="w-48">
          <module-drop-down
            :edit="true"
            title="Вид занятий"
            :options="[
              { id: 'group', name: 'Групповые' },
              { id: 'individual', name: 'Индивидуальный' },
            ]"
            :defaultVal="
              this.groupType === 'group' ? 'Групповые' : 'Индивидуальный'
            "
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
        <button @click="updateGroup" class="btn btn-primary w-50" type="submit">
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import customAxios from "../../api";
import ModuleDropDown from "../ModuleList/ModuleDropDown.vue";
import GroupDate from "./GroupDate.vue";
export default {
  props: ["currentGr"],
  emits: ["closeAddModule"],
  components: {
    ModuleDropDown,
    GroupDate,
  },
  data() {
    return {
      groupName: this.currentGr?.name,
      studentQty: this.currentGr?.current_students_number,
      duration: this.currentGr?.duration,
      limit: this.currentGr?.limit,
      lessonQty: this.currentGr?.number_of_lessons_per_month,
      groupDates: this.currentGr?.group_date,
      status: this.currentGr?.status,
      groupType: this.currentGr?.type_group,
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
    deleteDates(val) {
      this.groupDates = this.groupDates.filter(
        (date) => date.week[0] != val.week[0]
      );
      console.log(this.groupDates);
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
    async updateGroup() {
      try {
        await customAxios.post("group-erp/update_group/", {
          group: {
            id: this.currentGr.id,
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

        await this.$store.dispatch("getCurrentGroup", this.currentGr.id);
        await this.$store.dispatch("getGroupList");
        this.closeCreateGroup();
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
    getStatus(val) {
      this.status = val;
    },
    getType(val) {
      this.groupType = val;
    },
  },
};
</script>

<style scoped>
.create-wrap {
  max-width: 520px;
  margin: 0 auto;
  overflow: auto;
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
