import customAxios from "../api";
export default {
  getQR(context, payload) {
    context.commit("getQR", payload);
  },
  changeAuth(context) {
    context.commit("changeAuth");
  },
  errorHandle(context, payload) {
    context.commit("errorHandle", payload);
  },
  cancelError(context) {
    context.commit("cancelError");
  },
  async getQuestions(context) {
    try {
      const res = await customAxios.get("question/");
      context.commit("getQuestions", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async toggleStatus(context, payload) {
    try {
      await customAxios.get(
        `subscription-list/change_status/?${payload.property}_id=${payload.id}`,
        {
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("info"))?.token
            }`,
          },
        }
      );
      await context.dispatch("getNotificationAll", payload.period);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getNotifications(context) {
    try {
      let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      let today = new Date().toISOString().slice(0, 10);
      // ${JSON.parse(localStorage.getItem("info").user.id)?.token}
      const res = await customAxios.get(
        `subscription-list/filter_notification/?module_id=${
          JSON.parse(localStorage.getItem("info")).user.id
        }&start_date=${today}&finish_date=${tomorrow}`,
        {
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("info"))?.token
            }`,
          },
        }
      );
      context.commit("getNotifications", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  //
  async getNotificationAll(context, payload) {
    try {
      // ${JSON.parse(localStorage.getItem("info").user.id)?.token}
      const res = await customAxios.get(
        `subscription-list/filter_notification_all/?module_id=${
          JSON.parse(localStorage.getItem("info")).user.id
        }&start_date=${payload.stDay}&finish_date=${payload.fnDay}`,
        {
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("info"))?.token
            }`,
          },
        }
      );
      context.commit("getNotifications", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getModuleShort(context) {
    try {
      const res = await customAxios.get("module/get/");
      context.commit("getModuleShort", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
};
