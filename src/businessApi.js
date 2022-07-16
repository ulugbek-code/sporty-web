import axios from "axios";
import store from "./store";

const customAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 15000,
  // headers: {
  //   // Authorization: "token 1a60a2c4465084d0eebbe582b50b1cb7a7949903",
  //   Authorization: `token ${
  //     store.state.token || JSON.parse(localStorage.getItem("info"))?.token
  //   }`,
  // },
});

customAxios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("info")?.token);
  if (store.state.token || token) {
    config.headers.Authorization = `token ${store.state.token || token}`;
  }
  return config;
});

export default customAxios;
