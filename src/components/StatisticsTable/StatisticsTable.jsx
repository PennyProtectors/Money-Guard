import React from "react";
import { useSelector } from "react-redux";
import styles from "./StatisticsTable.module.css";

const StatisticsTable = ({ period = "This Month" }) => {
  const categoriesSummary = useSelector(
    (state) => state.statics?.data?.categoriesSummary || []
  );

  const transformedData = categoriesSummary.map((item) => ({
    category: item.name,
    total: item.total,
    average: item.total,
    count: 1,
  }));

  if (transformedData.length === 0) {
    return (
      <div className={styles.noData}>
        <p>No statistics data available yet.</p>
      </div>
    );
  }

  const totalAmount = transformedData.reduce(
    (sum, stat) => sum + stat.total,
    0
  );
  const totalCount = transformedData.reduce((sum, stat) => sum + stat.count, 0);
  const averageAmount = totalAmount / totalCount || 0;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.headerSection}>
        <h3 className={styles.tableTitle}>Statistics</h3>
        <span className={styles.periodInfo}>{period}</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.statisticsTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
              <th>Average</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {transformedData.map((stat, index) => (
              <tr key={index}>
                <td className={styles.categoryCell}>{stat.category}</td>
                <td className={styles.amount}>
                  $
                  {stat.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className={styles.amount}>
                  $
                  {stat.average.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className={styles.countCell}>{stat.count}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td className={styles.categoryCell}>
                <strong>TOTAL</strong>
              </td>
              <td className={styles.amount}>
                <strong>
                  $
                  {totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </strong>
              </td>
              <td className={styles.amount}>
                <strong>
                  $
                  {averageAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </strong>
              </td>
              <td className={styles.countCell}>
                <strong>{totalCount}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsTable;
