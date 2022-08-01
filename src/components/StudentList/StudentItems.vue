<template>
  <div class="items-wrap">
    <each-student-item
      v-for="list in lists"
      :list="list"
      :key="list.id"
      @click="getCurentItem(list.id)"
    ></each-student-item>
  </div>
</template>

<script>
import EachStudentItem from "./EachStudentItem.vue";
export default {
  props: ["lists"],
  components: {
    EachStudentItem,
  },
  methods: {
    getCurentItem(id) {
      this.$store.dispatch("getCurrentStudent", id);
      this.$store.dispatch("getIsStudent", "details");
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
.each-item p {
  color: #b6bccb;
  font-size: 12px;
  line-height: 16px;
  transition: all 0.1s ease;
}
.each-item:hover,
.each-item.active-item {
  background: #eaeaea;
}
.each-item.active-item p,
.each-item:hover p {
  color: #000;
}
</style>
