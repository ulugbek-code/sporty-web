<template>
  <vue-progress-bar></vue-progress-bar>
  <base-dialog :show="isError" @close="cancelErr">
    <template #default>
      <div class="form-task text-center">
        <img src="./assets/remove.png" alt="" />
        <h2 class="mt-2">Не отправлено</h2>
        <p>{{ isError }}</p>
      </div>
      <div class="d-grid text-center mt-5">
        <button @click="cancelErr" class="w-100 btn btn-primary py-2 px-5">
          Заново
        </button>
      </div>
    </template>
  </base-dialog>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>
<script>
import { defineAsyncComponent } from "vue";
const BaseDialog = defineAsyncComponent(() =>
  import("./components/UI/BaseDialog.vue")
);
export default {
  name: "App",
  components: {
    BaseDialog,
  },
  computed: {
    isError() {
      return this.$store.getters.getError;
    },
  },
  methods: {
    cancelErr() {
      this.$store.dispatch("cancelError");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;900&display=swap");

body {
  font-family: "Inter", sans-serif;
}
button {
  border-radius: 6px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #016bd4;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
td {
  vertical-align: middle;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to,
.nav-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.2s ease-out;
}
.route-leave-active,
.nav-leave-active {
  transition: all 0.2s ease-in;
}
.route-enter-to,
.route-leave-from,
.nav-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.error span {
  color: #ea4335;
}
.error {
  border: 1px solid #ea4335;
}
.error svg path {
  stroke: #ea4335;
}
</style>
