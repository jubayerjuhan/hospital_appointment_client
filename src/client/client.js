import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:9000/",
});

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const parsedToken = JSON.parse(accessToken);
        if (parsedToken) {
          config.headers["Authorization"] = `Bearer ${parsedToken}`;
        } else {
          console.error("Failed to parse access token");
        }
      }
    } catch (error) {
      console.error("Error retrieving access token:", error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
