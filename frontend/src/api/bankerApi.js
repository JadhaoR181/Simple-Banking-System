import axiosClient from "./axiosClient";

const bankerApi = {
  getAccounts: () => axiosClient.get("/banker/accounts"),
  getUserTransactions: (userId) =>
    axiosClient.get(`/banker/accounts/${userId}/transactions`),
};

export default bankerApi;
