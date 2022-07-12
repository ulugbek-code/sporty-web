<template>
  <teleport to="body">
    <div v-if="show" @click="$emit('close')"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header v-if="title">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section class="p-4">
          <slot></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    color: {
      type: String,
    },
    width: {
      required: false,
    },
    show: {
      required: true,
    },
  },
  emits: ["close"],
};
</script>

<style scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 15vh;
  /* left: 50%-12rem;
  transform: translate(-50%, -10%); */
  min-width: 300px;
  /* max-height: 100vh;
  overflow: auto; */
  z-index: 100;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0 auto;

  /* overflow: auto; */
}

header {
  position: relative;
  color: rgba(68, 68, 68, 1);
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}
header span {
  position: absolute;
  top: 10%;
  right: 5%;
  font-size: 24px;
  cursor: pointer;
}

section {
  padding: 0.4rem;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.35s ease;
}
@media (max-width: 768px) {
  dialog {
    top: 20%;
    width: 20rem;
  }
}
</style>
