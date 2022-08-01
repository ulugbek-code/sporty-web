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
  timeTable(state) {
    return state.timeTable;
  },
  moduleLists(state) {
    return state.moduleLists;
  },
  isCreateModule(state) {
    return state.isCreateModule;
  },
  isCreateLevel(state) {
    return state.isCreateLevel;
  },
  staffList(state) {
    return state.staffList;
  },
  isStudent(state) {
    return state.isStudent;
  },
  currentStudent(state) {
    return state.currentStudent;
  },
  studentList(state) {
    return state.studentList;
  },
  isGroup(state) {
    return state.isGroup;
  },
  currentGroup(state) {
    return state.currentGroup;
  },
  groupList(state) {
    return state.groupList;
  },
};
