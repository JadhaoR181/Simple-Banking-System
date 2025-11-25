import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bankerApi from "../api/bankerApi";
import TransactionTable from "../components/TransactionTable";

const BankerUserTransactions = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bankerApi.getUserTransactions(userId);
        setBalance(res.data.balance);
        setTransactions(res.data.transactions);
        setCustomerName(res.data.customerName || "Unknown Customer");
      } catch (err) {
        console.error(err);
        setError("Failed to load user transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="page banker-page">
      <div className="card banker-card">
        <div className="card-header-row banker-header">
          <button className="btn btn-outline" onClick={() => navigate("/banker/accounts")}>
            ← Back
          </button>
          <h2 className="page-title">Customer Transaction History</h2>
        </div>

        <div className="customer-info-card">
          <p><strong>Name:</strong> {customerName}</p>
          <p><strong>ID:</strong> #{userId}</p>
          <p><strong>Balance:</strong> ₹{Number(balance).toFixed(2)}</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {loading ? <div className="loading">Loading transactions...</div> : <TransactionTable transactions={transactions} />}
      </div>
    </div>
  );
};

export default BankerUserTransactions;
