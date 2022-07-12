import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./views/HomePage.vue";
const SignIn = () => import("./views/SignIn.vue");
const ForgetPassword = () => import("./views/ForgetPassword.vue");
const NewPassword = () => import("./views/NewPassword.vue");
const Notifications = () => import("./views/NotificationsPage.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/sign-in", component: SignIn },
    { path: "/forget", component: ForgetPassword },
    { path: "/new-password", component: NewPassword },
    { path: "/notifications", component: Notifications },
  ],
});

export default router;
