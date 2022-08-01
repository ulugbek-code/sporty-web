<template>
  <div @click.stop="" class="position-relative">
    <div class="hours-dd">
      <p v-if="isEmpty && !all.length" class="text-danger">
        Пожалуйста, выберите дни недели!
      </p>
      <p v-else>Выберите дни недели</p>
      <div class="weekDays-selector">
        <div
          @click="setTab(week)"
          v-for="week in weeks"
          :key="week"
          :class="selected === week ? 'active' : ''"
        >
          {{ week }}
        </div>
      </div>
      <group-date-tab
        :isEqualTab="selected === 'Пн'"
        :week="1"
        :day="filterAllDates(1)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
      <group-date-tab
        :isEqualTab="selected === 'Вт'"
        :week="2"
        :day="filterAllDates(2)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
      <group-date-tab
        :isEqualTab="selected === 'Ср'"
        :week="3"
        :day="filterAllDates(3)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
      <group-date-tab
        :isEqualTab="selected === 'Чт'"
        :week="4"
        :day="filterAllDates(4)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
      <group-date-tab
        :isEqualTab="selected === 'Пт'"
        :week="5"
        :day="filterAllDates(5)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
      <group-date-tab
        :isEqualTab="selected === 'Сб'"
        :week="6"
        :day="filterAllDates(6)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
      <group-date-tab
        :isEqualTab="selected === 'Вс'"
        :week="7"
        :day="filterAllDates(7)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
      ></group-date-tab>
    </div>
  </div>
</template>

<script>
import GroupDateTab from "./GroupDateTab.vue";
export default {
  props: ["all", "isEmpty"],
  emits: ["updateD", "delDate"],
  components: {
    GroupDateTab,
  },
  data() {
    return {
      selected: "",
      startHour: "",
      finishHour: "",
      weekDays: [],
      weeks: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    };
  },
  methods: {
    filterAllDates(day) {
      return this.all?.find((each) => each.week[0] == day);
    },
    changeDates(val) {
      this.$emit("updateD", val);
    },
    deleteDate(val) {
      this.$emit("delDate", val);
    },
    setTab(val) {
      this.selected = val;
    },
  },
};
</script>

<style scoped>
.hours-dd {
  background: #f6f6f6;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 12px;
}

/* week */
.weekDays-selector {
  display: flex;
  justify-content: space-between;
}
.weekDays-selector div {
  display: inline-block;
  border-radius: 6px;
  font-size: 12px;
  background: #d9d9d9;
  color: #fff;
  height: 45px;
  width: 45px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.weekDays-selector div.active {
  background: #016bd4;
  color: #ffffff;
}
</style>
