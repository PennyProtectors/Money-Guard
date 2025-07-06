import React from 'react';
import styles from './StatisticsTable.module.css';

const StatisticsTable = ({ statistics, period = 'This Month' }) => {
  if (!statistics || statistics.length === 0) {
    return (
      <div className={styles.noData}>
        <p>No statistics data available yet.</p>
      </div>
    );
  }

  // Genel toplamları hesapla
  const totalAmount = statistics.reduce((sum, stat) => sum + stat.total, 0);
  const totalCount = statistics.reduce((sum, stat) => sum + stat.count, 0);
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
            {statistics.map((stat, index) => (
              <tr key={index}>
                <td className={styles.categoryCell}>{stat.category}</td>
                <td className={styles.amount}>
                  {stat.total.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </td>
                <td className={styles.amount}>
                  {stat.average.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </td>
                <td className={styles.countCell}>{stat.count}</td>
              </tr>
            ))}
            {/* Total row */}
            <tr className={styles.totalRow}>
              <td className={styles.categoryCell}>
                <strong>TOTAL</strong>
              </td>
              <td className={styles.amount}>
                <strong>
                  {totalAmount.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  })}
                </strong>
              </td>
              <td className={styles.amount}>
                <strong>
                  {averageAmount.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
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