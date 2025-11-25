import { useEffect, useState } from "react";
import customerApi from "../api/customerApi";
import Modal from "../components/Modal";
import TransactionTable from "../components/TransactionTable";


const CustomerTransactions = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("DEPOSIT");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await customerApi.getTransactions();
      setBalance(res.data.balance);
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setAmount("");
    setError("");
    setSuccess("");
    setModalOpen(true);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const numericAmount = Number(amount);
  if (!numericAmount || numericAmount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // 1️⃣ ASK CONFIRMATION
  const isConfirmed = window.confirm(
    `Are you sure you want to ${modalType === "DEPOSIT" ? "deposit" : "withdraw"} ₹${numericAmount}?`
  );
  if (!isConfirmed) return;

  setIsProcessing(true); // Start spinner

  // 2️⃣ SIMULATED LOADING
  setTimeout(async () => {
    try {
      let message = "";

      if (modalType === "DEPOSIT") {
        const res = await customerApi.deposit(numericAmount);
        setBalance(res.data.balance);
        message = "Deposit Successful!";
      } else {
        const res = await customerApi.withdraw(numericAmount);
        setBalance(res.data.balance);
        message = "Withdrawal Successful!";
      }

      // 3️⃣ SHOW SUCCESS (NO alert)
      setSuccess(message);     

      // 4️⃣ CLOSE MODAL AFTER A SHORT DELAY
      setTimeout(() => {
        setModalOpen(false);
        setSuccess("");
      }, 800); // close smoothly after showing success

      await fetchData();

    } catch (err) {
      const msg = err.response?.data?.message || "Transaction failed";
      setError(msg);  // ❌ no alert
    } finally {
      setIsProcessing(false);
    }
  }, 800);
};



  return (
  <div className="page">
    <div className="card">

      {/* 🧾 USER INFO SECTION */}
      <div className="user-info-section">
        <h2>Welcome, {localStorage.getItem("name")}</h2>
        <p className="user-sub">
          Email: <span>{localStorage.getItem("email") || "Not available"}</span>
        </p>
        <p className="user-sub">
          Logged in at: <span>{new Date().toLocaleString()}</span>
        </p>
      </div>

      <div className="balance-card">
        <h3>Available Balance</h3>
        <p className="balance-amount">₹{Number(balance).toFixed(2)}</p>
      </div>

      <div className="action-buttons">
        <button className="btn btn-success" onClick={() => openModal("DEPOSIT")}>
          Deposit
        </button>
        <button className="btn btn-danger" onClick={() => openModal("WITHDRAW")}>
          Withdraw
        </button>
      </div>


      {loading ? (
        <div className="loading">Loading transactions...</div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>

    {/* MODAL */}
    <Modal
      isOpen={modalOpen}
      title={modalType === "DEPOSIT" ? "Deposit Money" : "Withdraw Money"}
      onClose={() => setModalOpen(false)}
    >
      <p>
        Current Balance: <strong>₹{Number(balance).toFixed(2)}</strong>
      </p>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Amount
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

     <button type="submit" className="btn btn-primary" disabled={isProcessing}>
  {isProcessing ? (
    <>
      Processing
      <span className="processing-spinner"></span>
    </>
  ) : (
    "Confirm"
  )}
</button>


      </form>
    </Modal>
  </div>
  );
};

export default CustomerTransactions;
