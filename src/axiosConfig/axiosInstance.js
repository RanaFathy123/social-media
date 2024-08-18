import axios from "axios";

let axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});
// let axiosInstanceWithHeaders = axios.create({
//   baseURL: "https://upskilling-egypt.com:3003/api/v1",
// });

// axiosInstanceWithHeaders.interceptors.request.use((config) => {
//   const token = `Bearer ${localStorage.getItem("token")}`;
//   config.headers.Authorization = token;
//   return config;
// });

export { axiosInstance };
