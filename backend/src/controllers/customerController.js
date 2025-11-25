const Account = require("../models/Account");

exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const transactions = await Account.getTransactionsByUser(userId);
  const balance = await Account.getBalance(userId);
  res.json({ balance, transactions });
};

exports.deposit = async (req, res) => {
  const { amount } = req.body;
  await Account.addTransaction(req.user.id, "DEPOSIT", amount);
  const balance = await Account.getBalance(req.user.id);
  res.json({ message: "Deposited", balance });
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  const balance = await Account.getBalance(req.user.id);

  if (amount > balance) {
    return res.status(400).json({ message: "Insufficient Funds" });
  }

  await Account.addTransaction(req.user.id, "WITHDRAW", amount);
  const newBalance = await Account.getBalance(req.user.id);
  res.json({ message: "Withdraw successful", balance: newBalance });
};
