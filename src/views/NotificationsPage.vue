<template>
  <div @click="toggleCalendarPP" class="notifications-wrapper">
    <div class="app-container">
      <notification-header
        :notifications="allNewItems"
        :isCalendarOpen="isCalendarOpen"
        :isSignOutVisible="isSignOutVisible"
        :period="period"
        :showBelow="showBelow"
        :tt="filteredTT"
        @getNotification="getNotf"
        @getInnerSignOut="getInnerSignOut"
        @toggleCalendar="getInnerToggle"
        @sendDates="getDates"
        @sendFilterTT="getTTFilter"
      ></notification-header>
      <div v-if="showBelow === 'ntf'" class="parent">
        <notification-course
          :period="period"
          :courses="notifications[0]?.courses"
          class="child div1"
        ></notification-course>
        <!-- {{ notifications[0]?.reviews[0] }} -->
        <notification-free
          :period="period"
          :lessons="notifications[0]?.free_lessons"
          @new-items="getNewFree"
          class="child div2"
        ></notification-free>
        <notification-feedback
          :period="period"
          :reviews="notifications[0]?.reviews"
          class="child div3"
        ></notification-feedback>
        <notification-event class="child div4"></notification-event>
      </div>
      <div v-else-if="showBelow === 'qr'">
        <q-r-code></q-r-code>
      </div>
      <div v-else-if="showBelow === 'tb'" class="parent-tt">
        <time-table :filteredTT="filteredTT"></time-table>
        <div id="add-room">
          <button v-if="!isInput" @click="toggleInput" class="add-button btn">
            <span><img src="../assets/plus.svg" alt="" /></span> Добавить
            комнату
          </button>
          <div v-else class="d-flex gap-2">
            <input
              v-model.trim="newRoom"
              @keydown.enter="addNewRoom"
              type="text"
              class="form-control"
              placeholder="Название комнаты"
            />
            <button @click="isInput = false" class="btn btn-danger">
              Отмена
            </button>
            <button
              @click="addNewRoom"
              class="btn btn-primary"
              :disabled="!newRoom"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="showBelow === 'student'">
        <student-list></student-list>
      </div>
      <div v-else-if="showBelow === 'groups'">
        <group-list></group-list>
      </div>
      <div v-else-if="showBelow === 'module'">
        <module-list></module-list>
      </div>
      <div v-else-if="showBelow === 'staff'">
        <staff-list></staff-list>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const QRCode = defineAsyncComponent(() => import("./QR.vue"));
const TimeTable = defineAsyncComponent(() =>
  import("../components/notifications/TimeTable.vue")
);
const ModuleList = defineAsyncComponent(() =>
  import("../components/ModuleList/ModuleList.vue")
);
const GroupList = defineAsyncComponent(() =>
  import("../components/GroupList/GroupList.vue")
);
const StudentList = defineAsyncComponent(() =>
  import("../components/StudentList/StudentList.vue")
);
const StaffList = defineAsyncComponent(() =>
  import("../components/StaffList/StaffList.vue")
);
import NotificationHeader from "../components/notifications/NotificationHeader.vue";
import NotificationCourse from "../components/notifications/NotificationCourse.vue";
import NotificationFree from "../components/notifications/NotificationFree.vue";
import NotificationEvent from "../components/notifications/NotificationEvent.vue";
import NotificationFeedback from "../components/notifications/NotificationFeedback.vue";
import customAxios from "../api";

export default {
  components: {
    NotificationHeader,
    NotificationCourse,
    NotificationFree,
    NotificationEvent,
    NotificationFeedback,
    QRCode,
    TimeTable,
    ModuleList,
    GroupList,
    StudentList,
    StaffList,
  },
  data() {
    return {
      isInput: false,
      newRoom: "",
      fetchTimeInterval: null,
      showBelow: "ntf",
      isCalendarOpen: false,
      isSignOutVisible: false,
      filteredTT: "odd",
      period: {
        stDay: new Date().toISOString().slice(0, 10),
        fnDay: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      },
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.allNotifications;
    },
    filteredNewLessons() {
      if (this.notifications.length) {
        return this.notifications[0]?.courses?.filter(
          (course) => course.is_new === "new"
        ).length;
      } else return null;
    },
    filteredNewFree() {
      if (this.notifications.length) {
        return this.notifications[0]?.free_lessons?.filter(
          (course) => course.is_new === "new"
        ).length;
      } else return null;
    },
    filteredReviews() {
      if (this.notifications.length) {
        return this.notifications[0]?.reviews?.filter(
          (course) => course.is_new === "new"
        ).length;
      } else return null;
    },
    allNewItems() {
      return (
        this.filteredNewLessons + this.filteredNewFree + this.filteredReviews
      );
    },
  },
  methods: {
    startFetching() {
      this.fetchTimeInterval = setInterval(
        () => this.$store.dispatch("getNotifications", this.period),
        60000
      );
    },
    async addNewRoom() {
      if (this.newRoom) {
        try {
          await customAxios.post("room/", {
            name: this.newRoom,
            module: JSON.parse(localStorage.getItem("info")).user.id,
            // module: 5,
          });
          await this.$store.dispatch("getFilteredTimeTable", this.filteredTT);
        } catch (e) {
          this.$store.dispatch("errorHandle", e);
        }
        this.isInput = false;
      }
    },
    toggleInput() {
      this.isInput = true;
    },
    getTTFilter(val) {
      this.filteredTT = val;
    },
    getDates(val) {
      this.period.stDay = val.startDate;
      this.period.fnDay = val.finishDate;
    },
    getInnerToggle() {
      this.isCalendarOpen = !this.isCalendarOpen;
    },
    getInnerSignOut() {
      this.isSignOutVisible = !this.isSignOutVisible;
    },
    toggleCalendarPP() {
      if (this.isCalendarOpen) this.isCalendarOpen = !this.isCalendarOpen;
      if (this.isSignOutVisible) this.isSignOutVisible = !this.isSignOutVisible;
    },
    getNewFree(val) {
      console.log(val);
    },
    getNotf(val) {
      this.showBelow = val;
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getNotifications");
    this.startFetching();
  },
  mounted() {
    this.$Progress.finish();
  },
  watch: {
    async filteredTT(val) {
      await this.$store.dispatch("getFilteredTimeTable", val);
    },
  },
  unmounted() {
    clearInterval(this.fetchTimeInterval);
  },
};
</script>

<style scoped>
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c4bdbd;
  background-image: none;
}

.app-container {
  width: 95%;
  margin: 0 auto;
}
.notifications-wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background: #eeeeee;
}
.parent {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}
.parent-tt {
  margin-top: 1rem;
  background: #fff;
  height: 74vh;
  border-radius: 15px;
  overflow: auto;
}
.child {
  height: 38vh;
  background: #fff;
  border-radius: 15px;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
}
.div1 {
  grid-area: 1 / 1 / 2 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 2 / 1 / 3 / 2;
}
.div4 {
  grid-area: 2 / 2 / 3 / 3;
}
#add-room {
  position: fixed;
  bottom: 1vh;
}
#add-room .add-button img {
  width: 11px;
}
#add-room input,
#add-room button {
  padding: 4px 12px;
  font-size: 13px;
}
#add-room .add-button:hover,
#add-room .add-button:active {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
#add-room .add-button {
  padding: 5px;
  font-size: 14px;
  color: #fff;
  /* color: #9d9d9d; */
  /* background: #ffffff; */
  background: #016bd4;
}
</style>
