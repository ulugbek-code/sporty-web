import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./views/HomePage.vue";
const SignIn = () => import("./views/SignIn.vue");
const ForgetPassword = () => import("./views/ForgetPassword.vue");
const NewPassword = () => import("./views/NewPassword.vue");
const NewPhoneNumber = () => import("./views/NewPhoneNumber.vue");
const Notifications = () => import("./views/NotificationsPage.vue");
const NotFound = () => import("./views/NotFound.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/sign-in", component: SignIn },
    {
      path: "/phone",
      component: NewPhoneNumber,
    },
    {
      path: "/forget",
      component: ForgetPassword,
    },
    {
      path: "/new-password",
      component: NewPassword,
    },
    {
      path: "/notifications",
      component: Notifications,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/sign-in");
  } else {
    next();
  }
});

export default router;
