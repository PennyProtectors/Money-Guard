import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import StatisticsDashboard from "../components/StatisticsDashboard/StatisticsDashboard";
import Chart from "../components/Chart/Chart";
import StatisticsTable from "../components/StatisticsTable/StatisticsTable";
import Currency from "../components/Currency/Currency";
import { fetchTransactionSummary } from "../redux/statics/operations";
import styles from "./StatisticsTab.module.css";
import home from "../assets/images/baseline-home-24px 3.png";
import stats from "../assets/images/baseline-timeline-24px 3.png";
import dollar from "../assets/images/baseline-timeline-24px 4.png";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1280 });
  const location = useLocation();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Get statistics from Redux store
  const statistics = useSelector((state) => state.statics?.data || {});
  const loading = useSelector((state) => state.statics?.loading || false);

  useEffect(() => {
    // Fetch statistics for current month and year on component mount
    dispatch(
      fetchTransactionSummary({ month: currentMonth, year: currentYear })
    );
  }, [dispatch, currentMonth, currentYear]);

  // Prepare data for StatisticsTable
  const tableData =
    statistics.categoryExpenses?.map((category) => ({
      category: category.category,
      total: category.amount,
      average: category.amount / (category.count || 1),
      count: category.count || 0,
    })) || [];

  if (isTablet) {
    return (
      <div className={styles.tabletStatistics}>
        <Header />
        <div className={styles.tabletContent}>
          <div className={styles.leftSidebar}>
            <div className={styles.menuItems}>
              <Link to="/" className={`${styles.menuItem} ${location.pathname === "/" ? styles.active : ""}`}>
                <img src={home} alt="Home" />
                <span>Home</span>
              </Link>
              <Link to="/statics" className={`${styles.menuItem} ${location.pathname === "/statics" ? styles.active : ""}`}>
                <img src={stats} alt="Statistics" />
                <span>Statistics</span>
              </Link>
            </div>
            <div className={styles.balanceContainer}>
              <div className={styles.balanceBox}>
                <div className={styles.balanceLabel}>YOUR BALANCE</div>
                <div className={styles.balanceAmount}>₴ 24 000.00</div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <Currency />
          </div>
        </div>
        <div className={styles.tabletStatisticsSection}>
          <div className={styles.statisticsContent}>
            <div className={styles.chartSection}>
              <Chart />
            </div>
            <div className={styles.tableSection}>
              <StatisticsDashboard />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={styles.mobileStatisticsPage}>
        <Header />
        <div className={styles.mobileNavigation}>
          <Link to="/" className={`${styles.navItem} ${location.pathname === "/" ? styles.activeNavItem : ""}`}>
            <img src={home} alt="Home" />
          </Link>
          <Link to="/statics" className={`${styles.navItem} ${location.pathname === "/statics" ? styles.activeNavItem : ""}`}>
            <img src={stats} alt="Statistics" />
          </Link>
          <Link to="/currency" className={`${styles.navItem} ${location.pathname === "/currency" ? styles.activeNavItem : ""}`}>
            <img src={dollar} alt="Currency" />
          </Link>
        </div>
        <div className={styles.statisticsTab}>
          <div className={styles.statisticsContainer}>
            <h2 className={styles.mobileStatsTitle}>Statistics</h2>
            
            <div className={styles.mobileChartContainer}>
              <div className={styles.chartSection}>
                <Chart />
              </div>
            </div>

            <div className={styles.mobileDashboard}>
              <StatisticsDashboard />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
