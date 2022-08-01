<template>
  <div class="detail-wrap">
    <each-group-detail
      v-if="isGroupContent === 'details'"
      @updateGr="setGroupById"
    ></each-group-detail>
    <create-group v-else-if="isGroupContent === 'create'"></create-group>
    <update-group
      v-else-if="isGroupContent === 'update'"
      :currentGr="currentGroup"
    ></update-group>
    <create-group-student
      v-else-if="isGroupContent === 'student'"
      :currentGr="currentGroup"
    ></create-group-student>
    <div
      v-else
      class="else-div d-flex justify-content-center align-items-center"
    >
      <div class="text-center">
        <img src="../../assets/empty-guy.svg" alt="" />
        <h6 class="mt-2">Выберите <b>группу</b> чтобы посмотреть детально</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
const EachGroupDetail = defineAsyncComponent(() =>
  import("./EachGroupDetail.vue")
);
const CreateGroup = defineAsyncComponent(() => import("./CreateGroup.vue"));
const UpdateGroup = defineAsyncComponent(() => import("./UpdateGroup.vue"));
const CreateGroupStudent = defineAsyncComponent(() =>
  import("./CreateGroupStudent.vue")
);
export default {
  components: {
    EachGroupDetail,
    CreateGroup,
    UpdateGroup,
    CreateGroupStudent,
  },
  data() {
    return {
      currentGroup: null,
    };
  },
  computed: {
    each() {
      return this.$store.getters.currentGroup;
    },
    isGroupContent() {
      return this.$store.getters.isGroup;
    },
  },
  methods: {
    setGroupById(val) {
      this.currentGroup = val;
    },
  },
  watch: {
    each() {
      this.$store.dispatch("getIsGroup", "details");
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
