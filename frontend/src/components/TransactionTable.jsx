import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!transactions || transactions.length === 0) {
    return <div className="no-data">No transactions yet.</div>;
  }

  // 🔹 Pagination Logic
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = transactions.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Action</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.map((t, idx) => {
            const dateObj = new Date(t.created_at);
            const date = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString();

            return (
              <tr key={t.id || idx}>
                <td>{indexOfFirst + idx + 1}</td>

                <td className={t.type === "DEPOSIT" ? "tag tag-deposit" : "tag tag-withdraw"}>
                  {t.type === "DEPOSIT" ? (
                    <>
                      <FaArrowUp style={{ marginRight: "4px" }} /> Deposit
                    </>
                  ) : (
                    <>
                      <FaArrowDown style={{ marginRight: "4px" }} /> Withdraw
                    </>
                  )}
                </td>

                <td className="amount-cell">
                  ₹{Number(t.amount).toFixed(2)}
                </td>

                <td>{date}</td>
                <td>{time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 🎯 PAGINATION CONTROLS */}
      <div className="pagination">
        <button className="btn btn-outline" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button className="btn btn-outline" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
