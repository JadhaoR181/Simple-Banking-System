const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const bankerRoutes = require("./routes/bankerRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/banker", bankerRoutes);

module.exports = app;
