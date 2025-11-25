const db = require("../config/db");


exports.createCustomer = (name, email, password_hash) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'CUSTOMER')",
      [name, email, password_hash],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
      if (err) reject(err);
      else resolve(rows[0]);
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, name, email FROM users WHERE id = ?", [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows[0]);  // Returns user object OR undefined
    });
  });
};


exports.saveAccessToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET access_token = ? WHERE id = ?",
      [token, userId],
      (err) => (err ? reject(err) : resolve())
    );
  });
};

exports.findByToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE access_token = ?", [token], (err, rows) => {
      if (err) reject(err);
      else resolve(rows[0]);
    });
  });
};
