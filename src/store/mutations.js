export default {
  changeAuth(state) {
    state.isAuth = true;
    state.token = JSON.parse(localStorage.getItem("info").token);
  },
  errorHandle(state, payload) {
    if (payload.request?.status === 400) {
      if (
        payload.response.data.username ||
        payload.response.data.phone_number
      ) {
        state.error = "Номер телефона уже занят";
      } else {
        state.error = payload.response.data; //"Логин или пароль неверный!";
      }
      return;
    }
    if (payload.request?.status === 401) {
      state.error = "Пожалуйста, войдите в систему еще раз!";
      return;
    } else if (payload.request?.status === 404) {
      state.error = "Не найдено";
      return;
    } else {
      state.error = "Упс! Что-то пошло не так!";
    }
  },
  cancelError(state) {
    state.error = "";
  },
  getNotifications(state, payload) {
    state.allNotifications = payload.data;
  },
  getModuleShort(state, payload) {
    state.moduleShort = payload.data;
  },
  getQuestions(state, payload) {
    state.questions = payload.data;
  },
  getQR(state, payload) {
    state.qr = payload.qr_code;
  },
  getTimeTable(state, payload) {
    state.timeTable = payload.data;
  },
  getModuleLists(state, payload) {
    state.moduleLists = payload.data;
  },
  changeCreateModule(state, payload) {
    if (payload) {
      state.isCreateModule = false;
    } else {
      state.isCreateModule = true;
      state.isCreateLevel = false;
    }
  },
  changeCreateLevel(state, payload) {
    if (payload) {
      state.isCreateLevel = false;
    } else {
      state.isCreateLevel = true;
      state.isCreateModule = false;
    }
  },
  getStaffList(state, payload) {
    state.staffList = payload.data;
  },
  getIsStudent(state, payload) {
    state.isStudent = payload;
  },
  getCurrentStudent(state, payload) {
    state.currentStudent = payload;
  },
  getStudentList(state, payload) {
    state.studentList = payload.data;
  },
  getIsGroup(state, payload) {
    state.isGroup = payload;
  },
  getCurrentGroup(state, payload) {
    state.currentGroup = payload;
  },
  getGroupList(state, payload) {
    state.groupList = payload.data;
  },
};
