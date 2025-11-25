import axiosClient from "./axiosClient";

const customerApi = {
  getTransactions: () => axiosClient.get("/customer/transactions"),
  deposit: (amount) => axiosClient.post("/customer/deposit", { amount }),
  withdraw: (amount) => axiosClient.post("/customer/withdraw", { amount }),
};

export default customerApi;
