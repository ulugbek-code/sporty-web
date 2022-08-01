<template>
  <div id="items-wrap">
    <each-item
      v-for="list in lists"
      :list="list"
      :activeItem="current"
      :key="list.id"
      @click="getCurentItem(list.id)"
    ></each-item>
  </div>
</template>

<script>
import EachItem from "./EachItem.vue";
export default {
  props: ["lists", "current"],
  emits: ["getCurrent"],
  components: {
    EachItem,
  },
  methods: {
    getCurentItem(id) {
      this.$emit("getCurrent", id);
    },
  },
};
</script>

<style scoped>
#items-wrap {
  height: 100%;
  width: 20%;
  background: #ffffff;
  border-radius: 15px;
  padding: 1rem;
  overflow: auto;
}
</style>
