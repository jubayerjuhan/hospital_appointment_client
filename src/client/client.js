import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:9000/",
});

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken, "accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
