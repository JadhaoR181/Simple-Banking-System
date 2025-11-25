import axiosClient from "./axiosClient";

const authApi = {
  login: (email, password) =>
    axiosClient.post("/auth/login", { email, password }),
   register: (name, email, password) =>
    axiosClient.post("/auth/register", { name, email, password }),
};

export default authApi;
