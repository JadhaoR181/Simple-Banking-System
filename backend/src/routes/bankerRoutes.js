const router = require("express").Router();
const { authMiddleware, onlyBanker } = require("../middleware/authMiddleware");
const { getAllAccounts, getUserTransactions } = require("../controllers/bankerController");

router.get("/accounts", authMiddleware, onlyBanker, getAllAccounts);
router.get("/accounts/:userId/transactions", authMiddleware, onlyBanker, getUserTransactions);

module.exports = router;
