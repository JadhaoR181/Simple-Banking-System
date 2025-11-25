const Account = require("../models/Account");
const User = require("../models/User");

exports.getAllAccounts = async (req, res) => {
  const customers = await Account.getAllCustomers();

  const results = [];
  for (const cust of customers) {
    const balance = await Account.getBalance(cust.id);
    results.push({ ...cust, balance });
  }

  res.json(results);
};

exports.getUserTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Account.getTransactionsByUser(userId);
    const balance = await Account.getBalance(userId);
    const user = await User.getUserById(userId);

    res.json({
      userId,
      customerName: user?.name || "Unknown Customer",
      balance,
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
