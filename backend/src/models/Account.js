const db = require("../config/db");

exports.getTransactionsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM accounts WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      (err, rows) => (err ? reject(err) : resolve(rows))
    );
  });
};

exports.addTransaction = (userId, type, amount) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO accounts (user_id, type, amount) VALUES (?, ?, ?)",
      [userId, type, amount],
      (err) => (err ? reject(err) : resolve())
    );
  });
};

exports.getBalance = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
        COALESCE(SUM(CASE WHEN type='DEPOSIT' THEN amount ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN type='WITHDRAW' THEN amount ELSE 0 END), 0) AS balance
       FROM accounts WHERE user_id = ?`,
      [userId],
      (err, rows) => (err ? reject(err) : resolve(rows[0].balance))
    );
  });
};

exports.getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, name, email FROM users WHERE role='CUSTOMER'",
      (err, rows) => (err ? reject(err) : resolve(rows))
    );
  });
};
