<template>
  <div class="items-wrap">
    <each-staff-item
      v-for="list in lists"
      :list="list"
      :activeItem="current"
      :key="list.id"
      @click="getCurentItem(list.id)"
    ></each-staff-item>
  </div>
</template>

<script>
import EachStaffItem from "./EachStaffItem.vue";
export default {
  props: ["lists", "current"],
  emits: ["getCurrent"],
  components: {
    EachStaffItem,
  },
  methods: {
    getCurentItem(id) {
      this.$emit("getCurrent", id);
    },
  },
};
</script>

<style scoped>
.items-wrap {
  height: 100%;
  width: 20%;
  background: #ffffff;
  border-radius: 15px;
  padding: 1rem;
  overflow: auto;
}
</style>
