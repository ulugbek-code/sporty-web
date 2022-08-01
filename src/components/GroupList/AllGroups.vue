<template>
  <div v-if="students.length" class="level-wrap">
    <each-group
      v-for="student in students"
      :student="student"
      :groupId="grId"
      :key="student.id"
      @updateStudent="$emit('updStudent')"
    ></each-group>
  </div>
</template>

<script>
import EachGroup from "./EachGroup.vue";
export default {
  props: ["students", "grId"],
  emits: ["updStudent"],
  components: {
    EachGroup,
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
