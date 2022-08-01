<template>
  <div id="module-app">
    <group-items :lists="allGroups"></group-items>
    <group-details></group-details>
  </div>
</template>

<script>
import customAxios from "../../api";
import GroupItems from "./GroupItems.vue";
import GroupDetails from "./GroupDetails.vue";
export default {
  components: {
    GroupItems,
    GroupDetails,
  },
  computed: {
    allGroups() {
      return this.$store.getters.groupList;
    },
  },
  methods: {
    async getModuleLists() {
      try {
        const res = await customAxios("class-erp/get/");
        this.moduleLists = res.data;
      } catch (e) {
        this.$store.dispatch("errorHandle", e);
      }
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getGroupList");
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>

<style scoped>
#module-app {
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
