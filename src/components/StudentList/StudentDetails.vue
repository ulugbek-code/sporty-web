<template>
  <div class="detail-wrap">
    <each-student-detail
      v-if="isStudentContent === 'details'"
    ></each-student-detail>
    <create-student v-else-if="isStudentContent === 'create'"></create-student>
    <update-student v-else-if="isStudentContent === 'update'"
      >update</update-student
    >
    <div
      v-else
      class="else-div d-flex justify-content-center align-items-center"
    >
      <div class="text-center">
        <img src="../../assets/empty-guy.svg" alt="" />
        <h6 class="mt-2">Выберите <b>студент</b> чтобы посмотреть детально</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const CreateStudent = defineAsyncComponent(() => import("./CreateStudent.vue"));
const UpdateStudent = defineAsyncComponent(() => import("./UpdateStudent.vue"));
const EachStudentDetail = defineAsyncComponent(() =>
  import("./EachStudentDetail.vue")
);

export default {
  components: {
    CreateStudent,
    EachStudentDetail,
    UpdateStudent,
  },
  computed: {
    each() {
      return this.$store.getters.currentStudent;
    },
    isStudentContent() {
      return this.$store.getters.isStudent;
    },
  },
  watch: {
    each() {
      this.$store.dispatch("getIsStudent", "details");
    },
  },
};
</script>

<style scoped>
.detail-wrap {
  position: relative;
  width: 80%;
  height: 100%;
  padding: 1rem;
  background: #fff;
  border-radius: 15px;
  overflow: auto;
}
.else-div {
  width: 100%;
  height: 100%;
}
h6 {
  color: #b6bccb;
  font-weight: 600;
}
</style>
