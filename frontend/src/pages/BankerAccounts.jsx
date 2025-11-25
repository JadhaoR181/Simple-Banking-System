import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bankerApi from "../api/bankerApi";

const BankerAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const bankerName = localStorage.getItem("name") || "Banker";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await bankerApi.getAccounts();
        setAccounts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const totalCustomers = accounts.length;
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance || 0),
    0
  );

  return (
    <div className="page">
      <div className="card">
        {/* Header */}
        <div className="card-header-row banker-header">
          <div>
            <h2>Customer Accounts Overview</h2>
            <p className="subtext">
              Click on any customer row to view their detailed transaction history.
            </p>
          </div>
          <div className="banker-info">
            <span className="banker-name">Logged in as: {bankerName}</span>
            <span className="role-chip">BANKER</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <p>Total Customers</p>
            <h3>{totalCustomers}</h3>
          </div>
          <div className="stat-card">
            <p>Total Balance (₹)</p>
            <h3>₹{totalBalance.toFixed(2)}</h3>
          </div>
        </div>

        {/* Table / States */}
        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading accounts...</div>
        ) : accounts.length === 0 ? (
          <div className="no-data">No customer accounts found.</div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Balance (₹)</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc, index) => (
                  <tr
                    key={acc.id}
                    className="clickable-row"
                    onClick={() => navigate(`/banker/accounts/${acc.id}`)}
                  >
                    <td>{index + 1}</td>
                    <td>{acc.name}</td>
                    <td>{acc.email}</td>
                    <td className="amount-cell">
                      ₹{Number(acc.balance).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankerAccounts;
