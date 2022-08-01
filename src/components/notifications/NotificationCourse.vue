<template>
  <div class="course-wrap table-responsive">
    <div class="header-tbl">
      <img src="../../assets/sertificate.svg" alt="" />
      <h4 class="mb-0 mx-3">Курсы</h4>
      <div>
        <p class="mb-0">
          {{ filteredNewCourses?.length }}
          <span v-if="filteredNewCourses?.length > 0" class="mx-1 new"
            >new</span
          >
        </p>
      </div>
    </div>
    <table v-if="courses?.length" class="table table-hover">
      <tbody>
        <tr class="active">
          <td>ФИО</td>
          <td>Тел</td>
          <td>Курсы</td>
          <td>Группа</td>
          <td>Уровень</td>
          <td>Время</td>
        </tr>
        <tr
          v-for="(course, index) in sortedArr"
          :key="course"
          class="each-section"
          :class="course?.is_new === 'new' ? 'active' : ''"
          @click="toggleStatus(course.subscription_id)"
        >
          <td>{{ course?.user_full_name }}</td>
          <td>{{ enforcePhoneFormat(course?.phone_number) }}</td>
          <td>{{ course.course_name }}</td>
          <td>{{ course?.group_name }}</td>
          <td>{{ course?.level_name }}</td>
          <td>
            <p v-for="(each, i) in course.lesson_time" :key="each">
              <span
                v-for="(f, idx) in getWeekdays({ index: index, idx: i })"
                :key="idx"
                >{{ f }}{{ idx === each.week.length - 1 ? "" : ", " }}</span
              >
              {{ each?.start_date.slice(0, 5) }} -
              {{ each?.finish_date.slice(0, 5) }}
            </p>
          </td>
          <td class="text-center">
            <span v-if="course?.is_new === 'new'" class="new">new</span><br />
            <span>{{ filterDate(course.create_at) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["courses", "period"],
  data() {
    return {
      weeks: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    };
  },
  computed: {
    filteredNewCourses() {
      if (this.courses) {
        return this.courses.filter((course) => course.is_new === "new");
      } else return null;
    },
    sortedArr() {
      if (this.courses.length) {
        let arr = this.courses;
        return arr.sort((a, b) => {
          return a.is_new < b.is_new ? -1 : a.is_new > b.is_new ? 1 : 0;
          // if (a.is_new < b.is_new) {
          //   return -1;
          // }
          // if (a.is_new > b.is_new) {
          //   return 1;
          // }
          // return 0;
        });
      } else {
        return null;
      }
    },
  },
  methods: {
    toggleStatus(id) {
      this.$store.dispatch("toggleStatus", {
        property: "subscription",
        id: id,
        period: this.period,
      });
    },
    getWeekdays(val) {
      return this.courses[val.index].lesson_time[val.idx]?.week.map((day) =>
        this.weeks.find((week, index) => ++index == day)
      );
    },
    enforcePhoneFormat(phone) {
      return `(${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(
        9,
        11
      )}-${phone.slice(11, 13)}`;
    },
    filterDate(date) {
      let now = new Date();
      if (
        new Date(date).getDate() == now.getDate() &&
        new Date(date).getMonth() == now.getMonth() &&
        new Date(date).getFullYear() == now.getFullYear()
      ) {
        return date.substring(11, 16);
      } else {
        return (
          date.substring(8, 10) +
          "." +
          date.substring(5, 7) +
          " " +
          date.substring(11, 16)
        );
      }
    },
  },
};
</script>

<style scoped>
.header-tbl {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 14px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}
tr:first-child {
  position: sticky;
  top: 64px;
  background: #fff;
}
tr:first-child::after {
  content: "";
  height: 0.5px;
  width: 100%;
  position: absolute;
  bottom: 2%;
  left: 0;
  z-index: 10;
  background: #010101;
}
p {
  font-size: 13px;
  color: #9d9d9d;
  margin-top: 6px;
}
tr {
  border-bottom: 1px solid #efefef;
}
td {
  font-size: 10px;
  color: #9d9d9d;
  padding: 4px;
}
tr:first-child td {
  font-weight: bolder;
}
.new {
  background: #ed303b;
  color: #fff;
  border-radius: 9px;
  padding: 0px 8px 1px;
  cursor: pointer;
}
.new:active {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
td p {
  margin: 0;
  font-size: 10px;
  color: #9d9d9d;
}
.active td,
.active td p {
  color: #1b1b1d;
  font-weight: 600;
}
.each-section {
  cursor: pointer;
  pointer-events: none;
}
.each-section.active {
  pointer-events: initial;
}
.each-section:active {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
tr:hover p {
  color: #1b1b1d;
}
</style>
