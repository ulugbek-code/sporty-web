export default {
  changeAuth(state) {
    state.isAuth = true;
    state.token = JSON.parse(localStorage.getItem("info").token);
  },
  errorHandle(state, payload) {
    if (payload.request.status === 400) {
      state.error = "Логин или пароль неверный!";
      return;
    }
    if (payload.request.status === 401) {
      state.error = "Пожалуйста, войдите в систему еще раз!";
      return;
    } else if (payload.request.status === 404) {
      state.error = "Oшибка 404";
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
};
