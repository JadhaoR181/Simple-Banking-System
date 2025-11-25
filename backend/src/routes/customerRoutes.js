const router = require("express").Router();
const { authMiddleware, onlyCustomer } = require("../middleware/authMiddleware");
const { getTransactions, deposit, withdraw } = require("../controllers/customerController");

router.get("/transactions", authMiddleware, onlyCustomer, getTransactions);
router.post("/deposit", authMiddleware, onlyCustomer, deposit);
router.post("/withdraw", authMiddleware, onlyCustomer, withdraw);

module.exports = router;
