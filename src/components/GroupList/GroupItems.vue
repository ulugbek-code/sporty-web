<template>
  <div class="items-wrap">
    <each-group-item
      v-for="list in lists"
      :list="list"
      :key="list.id"
      @click="getCurentItem(list.id)"
    ></each-group-item>
  </div>
</template>

<script>
import EachGroupItem from "./EachGroupItem.vue";
export default {
  props: ["lists"],
  components: {
    EachGroupItem,
  },
  methods: {
    getCurentItem(id) {
      this.$store.dispatch("getCurrentGroup", id);
      this.$store.dispatch("getIsGroup", "details");
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
