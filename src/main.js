import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import NavBar from "./components/UI/NavBar.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.component("nav-bar", NavBar);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
