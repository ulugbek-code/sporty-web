export default {
  getError(state) {
    return state.error;
  },
  getAuth(state) {
    return state.isAuth;
  },
  questions(state) {
    return state.questions;
  },
  allNotifications(state) {
    return state.allNotifications;
  },
  moduleShort(state) {
    return state.moduleShort;
  },
  qr(state) {
    return state.qr;
  },
};
