const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "No token provided" });

  const user = await User.findByToken(token);
  if (!user) return res.status(401).json({ message: "Invalid token" });

  req.user = user; // attach user to request
  next();
};

exports.onlyCustomer = (req, res, next) => {
  if (req.user.role !== "CUSTOMER")
    return res.status(403).json({ message: "Customer access only" });
  next();
};

exports.onlyBanker = (req, res, next) => {
  if (req.user.role !== "BANKER")
    return res.status(403).json({ message: "Banker access only" });
  next();
};
