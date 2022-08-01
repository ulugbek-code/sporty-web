<template>
  <div class="each-item" :class="activeItem === list.id ? 'active-item' : ''">
    <div>
      <h6 class="mb-0">{{ list.first_name }} {{ list.last_name }}</h6>
      <p class="mb-0">
        {{ list.middle_name }}
      </p>
    </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
