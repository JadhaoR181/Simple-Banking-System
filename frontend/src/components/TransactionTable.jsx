import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const TransactionTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!transactions || transactions.length === 0) {
    return <div className="no-data">No transactions yet.</div>;
  }

  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = transactions.slice(indexOfFirst, indexOfLast);

  return (
    <div className="table-wrapper responsive-table">
      <table className="table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Action</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.map((t, idx) => {
            const dateObj = new Date(t.created_at);
            return (
              <tr key={t.id || idx}>
                <td>{indexOfFirst + idx + 1}</td>
                <td className={t.type === "DEPOSIT" ? "tag tag-deposit" : "tag tag-withdraw"}>
                  {t.type === "DEPOSIT"
                    ? <><FaArrowUp /> Deposit</>
                    : <><FaArrowDown /> Withdraw</>}
                </td>
                <td>₹{Number(t.amount).toFixed(2)}</td>
                <td>{dateObj.toLocaleDateString()}</td>
                <td>{dateObj.toLocaleTimeString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button className="btn btn-outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button className="btn btn-outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionTable;
