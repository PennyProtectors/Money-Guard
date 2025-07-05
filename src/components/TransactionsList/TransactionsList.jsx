import React from "react";
import "./TransactionsList.css";
const TransactionsList = () => {
  return (
    <div className="transactionsList_Area">
      <table className="transactionsList_Table">
        <thead className="transactionsList_Table_Header">
          <th className="column">Date</th>
          <th className="column">Type</th>
          <th className="column">Category</th>
          <th className="column">Comment</th>
          <th colSpan={2} className="column">
            Sum
          </th>
        </thead>
        <tbody>
          <tr>
            <td>04.01.23</td>
            <td>-</td>
            <td>Other</td>
            <td>Gift for your wife</td>
            <td>300.00</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
