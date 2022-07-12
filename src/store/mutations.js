export default {
  getNotifications(state, payload) {
    state.notifications = payload.data;
  },
  getModuleShort(state, payload) {
    state.moduleShort = payload.data;
  },
  getQuestions(state, payload) {
    state.questions = payload.data;
  },
};
