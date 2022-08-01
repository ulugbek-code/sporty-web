import axios from "axios";
import router from "./router";

const customAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: process.env.VUE_APP_LOCAL_URL,
  // timeout: 15000,
  // headers: {
  //   // Authorization: "token ee0383cd78080ce5f5a2ad341c11a1fb5af239a9",
  //   Authorization: `token ${JSON.parse(localStorage.getItem("token"))}`,
  // },
});

customAxios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

customAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.clear();
      router.replace("/sign-in");
    }
    return Promise.reject(error);
  }
);

export default customAxios;
