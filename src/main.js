import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import NavBar from "./components/UI/NavBar.vue";

const options = {
  color: "#4361ee",
  failedColor: "#FF2511",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.5s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueProgressBar, options);
app.component("nav-bar", NavBar);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";

export default app;
