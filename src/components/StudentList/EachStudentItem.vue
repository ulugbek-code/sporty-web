<template>
  <div
    v-if="list"
    class="each-item"
    :class="activeItem === list.id ? 'active-item' : ''"
  >
    <div>
      <h6 class="mb-0">{{ list.first_name }} {{ list.last_name }}</h6>
      <p class="mb-0">
        {{ list.id }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  computed: {
    activeItem() {
      return this.$store.getters.currentStudent;
    },
  },
};
</script>

<style scoped>
.each-item {
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.each-item p {
  color: #b6bccb;
  font-size: 12px;
  line-height: 16px;
}
.each-item:hover,
.each-item.active-item {
  background: #eaeaea;
}
.each-item button {
  font-size: 12px;
}
</style>
