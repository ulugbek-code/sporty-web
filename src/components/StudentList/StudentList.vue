<template>
  <div class="module-app">
    <student-items :lists="allStudents"></student-items>
    <student-details></student-details>
  </div>
</template>

<script>
import StudentItems from "./StudentItems.vue";
import StudentDetails from "./StudentDetails.vue";
export default {
  components: {
    StudentItems,
    StudentDetails,
  },
  computed: {
    allStudents() {
      return this.$store.getters.studentList;
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getStudentList");
  },
  mounted() {
    this.$Progress.finish();
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
