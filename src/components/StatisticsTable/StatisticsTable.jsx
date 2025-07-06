import React from "react";
import styles from "./StatisticsTable.module.css";

// Props: categories: [{ name: string, total: number }]
const StatisticsTable = ({ categories = [] }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Period Total</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="2">No records</td>
            </tr>
          ) : (
            categories.map((cat, idx) => (
              <tr key={idx}>
                <td>{cat.name}</td>
                <td>{cat.total.toLocaleString("en-US")} ₺</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable; 