import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://e-hub.uz/",
  timeout: 15000,
  headers: {
    Authorization: "token 1a60a2c4465084d0eebbe582b50b1cb7a7949903",
    // Authorization: `Token ${JSON.parse(localStorage.getItem("token"))}`,
  },
});

// customAxios.interceptors.request.use((config) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

export default customAxios;
