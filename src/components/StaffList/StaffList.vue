<template>
  <div class="module-app">
    <staff-items
      :lists="allStaffList"
      :current="currentItem"
      @getCurrent="getCurrentItem"
    ></staff-items>
    <staff-details :each="currentItem"></staff-details>
  </div>
</template>

<script>
// import customAxios from "../../api";
import StaffItems from "./StaffItems.vue";
import StaffDetails from "./StaffDetails.vue";
export default {
  components: {
    StaffItems,
    StaffDetails,
  },
  data() {
    return {
      currentItem: null,
    };
  },
  computed: {
    allStaffList() {
      return this.$store.getters.staffList;
    },
  },
  methods: {
    getCurrentItem(val) {
      this.currentItem = val;
    },
  },
  async created() {
    await this.$store.dispatch("getStaffList");
  },
};
</script>

<style scoped>
.module-app {
  display: flex;
  margin-top: 1rem;
  height: 79vh;
  overflow: auto;
  gap: 1rem;
}
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
</style>
