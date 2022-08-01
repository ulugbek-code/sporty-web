<template>
  <div class="each-item" :class="activeItem === list.id ? 'active-item' : ''">
    <h6 class="mb-0">{{ list?.name }}</h6>
    <p class="mb-0">{{ list?.id }}</p>
  </div>
</template>

<script>
export default {
  props: ["list", "activeItem"],
};
</script>

<style scoped>
.each-item {
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
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
</style>
