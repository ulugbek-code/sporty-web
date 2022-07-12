<template>
  <div class="notifications-wrapper">
    <div class="app-container">
      <notification-header @getNotification="getNotf"></notification-header>
      <div v-if="!isGanttChart" class="parent">
        <notification-course class="child div1"></notification-course>
        <notification-free class="child div2"></notification-free>
        <notification-event class="child div3"></notification-event>
        <notification-feedback class="child div4"></notification-feedback>
      </div>
      <div v-else>hello</div>
    </div>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      isGanttChart: false,
    };
  },
  computed: {
    notifications() {
      return this.$store.getters.allNotifications;
    },
  },
  methods: {
    getNotf(val) {
      if (val) {
        this.isGanttChart = true;
      } else {
        this.isGanttChart = false;
      }
    },
  },
  async created() {
    this.$store.dispatch("getNotifications");
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
  width: 92%;
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
