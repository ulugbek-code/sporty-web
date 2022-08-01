<template>
  <div v-if="levels.length" class="level-wrap">
    <each-level
      v-for="level in levels"
      :level="level"
      :moduleN="moduleName"
      :key="level.id"
      @deleteLevel="$emit('deleteLvl')"
      @editLvl="$emit('editLevel', $event)"
    ></each-level>
  </div>
</template>

<script>
import EachLevel from "./EachLevel.vue";
export default {
  props: ["levels", "moduleName"],
  emits: ["deleteLvl", "editLevel"],
  components: {
    EachLevel,
  },
};
</script>

<style scoped>
.level-wrap {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 1rem;
  overflow: auto;
}
</style>
