import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatisticsDashboard from '../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../components/Chart/Chart';
import StatisticsTable from '../components/StatisticsTable/StatisticsTable';
import { fetchTransactionStatistics } from '../redux/transactions/operations';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  // Get statistics from Redux store
  const statistics = useSelector(state => state.transaction?.statistics || {});
  const loading = useSelector(state => state.transaction?.loading || false);

  useEffect(() => {
    // Fetch statistics for current month and year on component mount
    dispatch(fetchTransactionStatistics({ month: currentMonth, year: currentYear }));
  }, [dispatch, currentMonth, currentYear]);

  // Prepare data for StatisticsTable
  const tableData = statistics.categoryExpenses?.map(category => ({
    category: category.category,
    total: category.amount,
    average: category.amount / (category.count || 1),
    count: category.count || 0
  })) || [];

  return (
    <div className={styles.statisticsTab}>
      <div className={styles.statisticsContainer}>
        <StatisticsDashboard />
        
        <div className={styles.statisticsContent}>
          <div className={styles.chartSection}>
            <Chart />
          </div>
          
          <div className={styles.tableSection}>
            <StatisticsTable 
              statistics={tableData}
              period={`${currentMonth}/${currentYear}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab; 