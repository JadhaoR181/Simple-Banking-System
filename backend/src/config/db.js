const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  
  // 🔥 This fixes SSL certificate error:
  ssl: {
    rejectUnauthorized: false, // allow self-signed Aiven SSL
  }
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✔ Connected to AIVEN MySQL!");
  }
});

module.exports = db;
