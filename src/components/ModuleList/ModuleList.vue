<template>
  <div id="module-app">
    <module-items
      :lists="moduleList"
      :current="currentItem"
      @getCurrent="getCurrentItem"
    ></module-items>
    <module-detailed
      :eachId="currentItem"
      :updChanged="closeUpdate"
      @removeModule="changeCurrentItem"
      @changeEachId="setEachId"
    ></module-detailed>
  </div>
</template>

<script>
import ModuleItems from "./ModuleItems.vue";
import ModuleDetailed from "./ModuleDetailed.vue";
export default {
  components: {
    ModuleItems,
    ModuleDetailed,
  },
  data() {
    return {
      currentItem: null,
      closeUpdate: false,
    };
  },
  computed: {
    moduleList() {
      return this.$store.getters.moduleLists;
    },
  },
  methods: {
    setEachId(val) {
      this.currentItem = val;
    },
    getCurrentItem(val) {
      this.$store.dispatch("changeCreateModule", true);
      this.$store.dispatch("changeCreateLevel", true);
      this.closeUpdate = !this.closeUpdate;
      this.currentItem = val;
    },
    changeCurrentItem() {
      this.currentItem = "";
    },
  },
  async created() {
    this.$Progress.start();
    await this.$store.dispatch("getModuleLists");
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
