import customAxios from "../api";

export default {
  async getQuestions(context) {
    try {
      const res = await customAxios.get("api/v1/question/");
      context.commit("getQuestions", res);
    } catch (e) {
      context.commit("getError", e.message);
    }
  },
  async getNotifications(context) {
    try {
      const res = await customAxios.get(
        "api/v1/subscription-list/get_notification/?module_id=1&start_date=null&finish_date=null"
      );
      context.commit("getNotifications", res);
    } catch (e) {
      console.log(e.response);
    }
  },
  async getModuleShort(context) {
    try {
      const res = await customAxios.get("api/v1/module/get/");
      context.commit("getModuleShort", res);
    } catch (e) {
      // context.commit("getError", e.message);
      console.log(e);
    }
  },
};
