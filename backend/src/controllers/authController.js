const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await User.createCustomer(name, email, password_hash);

    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = uuidv4(); // 36 char token
  await User.saveAccessToken(user.id, token);

  res.json({
    message: "Login successful",
    token,
    role: user.role,
    userId: user.id,
    name: user.name,
  });
};
