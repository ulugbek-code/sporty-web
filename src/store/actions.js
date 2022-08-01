import customAxios from "../api";
export default {
  getCurrentStudent(context, payload) {
    context.commit("getCurrentStudent", payload);
  },
  getCurrentGroup(context, payload) {
    context.commit("getCurrentGroup", payload);
  },
  changeCreateModule(context, payload) {
    context.commit("changeCreateModule", payload);
  },
  changeCreateLevel(context, payload) {
    context.commit("changeCreateLevel", payload);
  },
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
  getIsStudent(context, payload) {
    context.commit("getIsStudent", payload);
  },
  getIsGroup(context, payload) {
    context.commit("getIsGroup", payload);
  },
  async getQuestions(context) {
    try {
      const res = await customAxios.get("question/");
      context.commit("getQuestions", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getStaffList(context) {
    try {
      const res = await customAxios.get("staff-erp/get/");
      context.commit("getStaffList", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getFilteredTimeTable(context, payload) {
    let days;
    if (payload === "even") {
      days = "2,4,6";
    } else if (payload === "odd") {
      days = "1,3,5";
    } else {
      days = payload;
    }
    try {
      const res = await customAxios.get(
        `room/filter_timetablea/?module_id=${
          JSON.parse(localStorage.getItem("info")).user.id
        }&weeks=${days}`
      );
      // const res = await customAxios.get("room/timetable/");
      context.commit("getTimeTable", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async toggleStatus(context, payload) {
    try {
      await customAxios.get(
        `subscription-list/change_status/?${payload.property}_id=${payload.id}`
      );
      await context.dispatch("getNotificationAll", payload.period);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getNotifications(context, payload) {
    let start, finish;
    if (payload) {
      start = payload.stDay;
      finish = payload.fnDay;
    } else {
      let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      let today = new Date().toISOString().slice(0, 10);
      start = today;
      finish = tomorrow;
    }

    try {
      const res = await customAxios.get(
        `subscription-list/filter_notification/?module_id=${
          JSON.parse(localStorage.getItem("info")).user.id
        }&start_date=${start}&finish_date=${finish}`
      );
      context.commit("getNotifications", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  //
  async getNotificationAll(context, payload) {
    try {
      const res = await customAxios.get(
        `subscription-list/filter_notification_all/?module_id=${
          JSON.parse(localStorage.getItem("info")).user.id
        }&start_date=${payload.stDay}&finish_date=${payload.fnDay}`
        // {
        //   // headers: {
        //   //   Authorization: `token ${
        //   //     JSON.parse(localStorage.getItem("info"))?.token
        //   //   }`,
        //   // },
        //   headers: {
        //     // Authorization: `token ${
        //     //   JSON.parse(localStorage.getItem("info"))?.token
        //     // }`,
        //     Authorization: `token ee0383cd78080ce5f5a2ad341c11a1fb5af239a9`,
        //   },
        // }
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
  async getModuleLists(context) {
    try {
      const res = await customAxios.get(
        `class-erp/get/?id=${JSON.parse(localStorage.getItem("info")).user.id}`
      );
      context.commit("getModuleLists", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getStudentList(context) {
    try {
      const res = await customAxios.get(
        `student-erp/get/?module_id=${
          JSON.parse(localStorage.getItem("info")).user.id
        }`
      );
      context.commit("getStudentList", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
  async getGroupList(context) {
    try {
      const res = await customAxios.get(
        `group-erp/get/?id=${JSON.parse(localStorage.getItem("info")).user.id}`
      );
      context.commit("getGroupList", res);
    } catch (e) {
      context.commit("errorHandle", e);
    }
  },
};
