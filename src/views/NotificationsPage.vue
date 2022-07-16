<template>
  <div @click="toggleCalendarPP" class="notifications-wrapper">
    <div class="app-container">
      <notification-header
        :notifications="allNewItems"
        :isCalendarOpen="isCalendarOpen"
        :isSignOutVisible="isSignOutVisible"
        :period="period"
        :showBelow="showBelow"
        @getNotification="getNotf"
        @getInnerSignOut="getInnerSignOut"
        @toggleCalendar="getInnerToggle"
        @sendDates="getDates"
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
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const QRCode = defineAsyncComponent(() => import("./QR.vue"));
import NotificationHeader from "../components/notifications/NotificationHeader.vue";
import NotificationCourse from "../components/notifications/NotificationCourse.vue";
import NotificationFree from "../components/notifications/NotificationFree.vue";
import NotificationEvent from "../components/notifications/NotificationEvent.vue";
import NotificationFeedback from "../components/notifications/NotificationFeedback.vue";

export default {
  components: {
    NotificationHeader,
    NotificationCourse,
    NotificationFree,
    NotificationEvent,
    NotificationFeedback,
    QRCode,
  },
  data() {
    return {
      showBelow: "ntf",
      isCalendarOpen: false,
      isSignOutVisible: false,
      period: {
        stDay: "",
        fnDay: "",
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
    await this.$store.dispatch("getNotifications");
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
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}
.child {
  height: 36vh;
  background: #fff;
  border-radius: 15px;
  overflow-y: auto;
  padding: 1rem;
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
</style>
