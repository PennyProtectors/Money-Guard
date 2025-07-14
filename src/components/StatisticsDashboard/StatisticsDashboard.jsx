import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { fetchTransactionSummary } from "../../redux/statics/operations";
import styles from "./StatisticsDahsboard.module.css";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Mevcut tarih bilgilerini al
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Redux store'dan istatistikleri al
  const statistics = useSelector((state) => state.statics?.data || {});
  const categoriesSummary = useSelector(
    (state) => state.statics?.data?.categoriesSummary || []
  );

  // Dinamik yıl listesi - mevcut yılı da içerir
  const years = ["2021", "2022", "2023", "2024", currentYear.toString()]
    .filter((year, index, arr) => arr.indexOf(year) === index)
    .sort();

  const formatAmount = (amount) => {
    return `₴ ${Math.abs(amount || 0).toFixed(2)}`;
  };

  // Kategorilerden toplam income ve expense hesapla
  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpenses = 0;

    categoriesSummary.forEach((category) => {
      if (category.type === "INCOME") {
        totalIncome += category.total;
      } else {
        totalExpenses += Math.abs(category.total);
      }
    });

    return { totalIncome, totalExpenses };
  };

  const { totalIncome, totalExpenses } = calculateTotals();

  // Component mount olduğunda mevcut ay/yıl için veri çek
  useEffect(() => {
    const monthIndex = months.indexOf(selectedMonth) + 1;
    dispatch(
      fetchTransactionSummary({
        month: monthIndex,
        year: parseInt(selectedYear),
      })
    );
  }, [selectedMonth, selectedYear, dispatch]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  // Tablet görünümü için özel render
  const isTabletView = useMediaQuery({ minWidth: 769, maxWidth: 1280 });
  const isDesktop = useMediaQuery({ minWidth: 1281 });

  // Add desktop view before tablet view
  if (isDesktop) {
    return (
      <div className={styles["statistics-dashboard"]}>
        <div className={styles["filter-section"]}>
          {/* Month Dropdown */}
          <div className={styles["dropdown-container"]}>
            <button
              className={`${styles["dropdown-button"]} ${
                showMonthDropdown ? styles.open : ""
              }`}
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <span>{selectedMonth}</span>
              <div className={styles["dropdown-arrow"]}></div>
            </button>
            {showMonthDropdown && (
              <div className={styles["dropdown-menu"]}>
                {months.map((month) => (
                  <div
                    key={month}
                    className={`${styles["dropdown-item"]} ${
                      selectedMonth === month ? styles.selected : ""
                    }`}
                    onClick={() => handleMonthChange(month)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className={styles["dropdown-container"]}>
            <button
              className={`${styles["dropdown-button"]} ${
                showYearDropdown ? styles.open : ""
              }`}
              onClick={() => setShowYearDropdown(!showYearDropdown)}
            >
              <span>{selectedYear}</span>
              <div className={styles["dropdown-arrow"]}></div>
            </button>
            {showYearDropdown && (
              <div className={styles["dropdown-menu"]}>
                {years.map((year) => (
                  <div
                    key={year}
                    className={`${styles["dropdown-item"]} ${
                      selectedYear === year ? styles.selected : ""
                    }`}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories List */}
        <div className={styles["categories-section"]}>
          <div className={styles["categories-header"]}>
            <span className={styles["header-category"]}>Category</span>
            <span className={styles["header-sum"]}>Sum</span>
          </div>

          <div className={styles["categories-list"]}>
            {categoriesSummary.length > 0 ? (
              categoriesSummary.map((category, index) => (
                <div key={index} className={styles["category-item"]}>
                  <div className={styles["category-info"]}>
                    <div
                      className={`${styles["category-color"]} ${
                        styles[`color-${index % 9}`]
                      }`}
                    ></div>
                    <span className={styles["category-name"]}>
                      {category.name}
                    </span>
                  </div>
                  <span className={styles["category-amount"]}>
                    {Math.abs(category.total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className={styles["no-data"]}>
                <p>No data available for this period</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className={styles["desktop-summary"]}>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-label"]}>Expenses:</span>
            <span className={`${styles["summary-amount"]} ${styles.expense}`}>
              {totalExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-label"]}>Income:</span>
            <span className={`${styles["summary-amount"]} ${styles.income}`}>
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isTabletView) {
    return (
      <div className={styles["statistics-dashboard"]}>
        <div className={styles["filter-section"]}>
          {/* Month Dropdown */}
          <div className={styles["dropdown-container"]}>
            <button
              className={`${styles["dropdown-button"]} ${
                showMonthDropdown ? styles.open : ""
              }`}
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <span>{selectedMonth}</span>
              <div className={styles["dropdown-arrow"]}></div>
            </button>
            {showMonthDropdown && (
              <div className={styles["dropdown-menu"]}>
                {months.map((month) => (
                  <div
                    key={month}
                    className={`${styles["dropdown-item"]} ${
                      selectedMonth === month ? styles.selected : ""
                    }`}
                    onClick={() => handleMonthChange(month)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className={styles["dropdown-container"]}>
            <button
              className={`${styles["dropdown-button"]} ${
                showYearDropdown ? styles.open : ""
              }`}
              onClick={() => setShowYearDropdown(!showYearDropdown)}
            >
              <span>{selectedYear}</span>
              <div className={styles["dropdown-arrow"]}></div>
            </button>
            {showYearDropdown && (
              <div className={styles["dropdown-menu"]}>
                {years.map((year) => (
                  <div
                    key={year}
                    className={`${styles["dropdown-item"]} ${
                      selectedYear === year ? styles.selected : ""
                    }`}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories List */}
        <div className={styles["categories-section"]}>
          <div className={styles["categories-header"]}>
            <span className={styles["header-category"]}>Category</span>
            <span className={styles["header-sum"]}>Sum</span>
          </div>

          <div className={styles["categories-list"]}>
            {categoriesSummary.length > 0 ? (
              categoriesSummary.map((category, index) => (
                <div key={index} className={styles["category-item"]}>
                  <div className={styles["category-info"]}>
                    <div
                      className={`${styles["category-color"]} ${
                        styles[`color-${index % 9}`]
                      }`}
                    ></div>
                    <span className={styles["category-name"]}>
                      {category.name}
                    </span>
                  </div>
                  <span className={styles["category-amount"]}>
                    {Math.abs(category.total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className={styles["no-data"]}>
                <p>No data available for this period</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className={styles["tablet-summary"]}>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-label"]}>Expenses:</span>
            <span className={`${styles["summary-amount"]} ${styles.expense}`}>
              {totalExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-label"]}>Income:</span>
            <span className={`${styles["summary-amount"]} ${styles.income}`}>
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={styles["statistics-dashboard"]}>
        <div className={styles["filter-section"]}>
          {/* Month Dropdown */}
          <div className={styles["dropdown-container"]}>
            <button
              className={`${styles["dropdown-button"]} ${
                showMonthDropdown ? styles.open : ""
              }`}
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <span>{selectedMonth}</span>
              <div className={styles["dropdown-arrow"]}></div>
            </button>
            {showMonthDropdown && (
              <div className={styles["dropdown-menu"]}>
                {months.map((month) => (
                  <div
                    key={month}
                    className={`${styles["dropdown-item"]} ${
                      selectedMonth === month ? styles.selected : ""
                    }`}
                    onClick={() => handleMonthChange(month)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className={styles["dropdown-container"]}>
            <button
              className={`${styles["dropdown-button"]} ${
                showYearDropdown ? styles.open : ""
              }`}
              onClick={() => setShowYearDropdown(!showYearDropdown)}
            >
              <span>{selectedYear}</span>
              <div className={styles["dropdown-arrow"]}></div>
            </button>
            {showYearDropdown && (
              <div className={styles["dropdown-menu"]}>
                {years.map((year) => (
                  <div
                    key={year}
                    className={`${styles["dropdown-item"]} ${
                      selectedYear === year ? styles.selected : ""
                    }`}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories List */}
        <div className={styles["categories-section"]}>
          <div className={styles["categories-header"]}>
            <span className={styles["header-category"]}>Category</span>
            <span className={styles["header-sum"]}>Sum</span>
          </div>

          <div className={styles["categories-list"]}>
            {categoriesSummary.length > 0 ? (
              categoriesSummary.map((category, index) => (
                <div key={index} className={styles["category-item"]}>
                  <div className={styles["category-info"]}>
                    <div
                      className={`${styles["category-color"]} ${
                        styles[`color-${index % 9}`]
                      }`}
                    ></div>
                    <span className={styles["category-name"]}>
                      {category.name}
                    </span>
                  </div>
                  <span className={styles["category-amount"]}>
                    {Math.abs(category.total).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className={styles["no-data"]}>
                <p>No data available for this period</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className={styles["mobile-summary"]}>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-label"]}>Expenses:</span>
            <span className={`${styles["summary-amount"]} ${styles.expense}`}>
              {totalExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className={styles["summary-row"]}>
            <span className={styles["summary-label"]}>Income:</span>
            <span className={`${styles["summary-amount"]} ${styles.income}`}>
              {totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default StatisticsDashboard;
