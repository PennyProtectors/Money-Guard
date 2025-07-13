import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { fetchTransactionStatistics } from '../../redux/transactions/operations';
import './StatisticsDahsboard.css';

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  
  // Get statistics from Redux store
  const statistics = useSelector(state => state.transaction?.statistics || {});
  const totalExpenses = statistics.totalExpenses || 0;
  const totalIncome = statistics.totalIncome || 0;

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i);

  useEffect(() => {
    dispatch(fetchTransactionStatistics({ month: selectedMonth, year: selectedYear }));
  }, [selectedMonth, selectedYear, dispatch]);

  const handleMonthChange = (monthValue) => {
    setSelectedMonth(monthValue);
    setShowMonthDropdown(false);
  };

  const handleYearChange = (yearValue) => {
    setSelectedYear(yearValue);
    setShowYearDropdown(false);
  };

  const getSelectedMonthLabel = () => {
    return months.find(month => month.value === selectedMonth)?.label || 'Select Month';
  };

  return (
    <div className="statistics-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Statistics</h2>
        
        <div className="selector-container">
          {/* Month Selector */}
          <div className="dropdown-container">
            <button
              className="dropdown-trigger"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              {getSelectedMonthLabel()}
              <ChevronDown className="dropdown-icon" />
            </button>
            
            {showMonthDropdown && (
              <div className="dropdown-months">
                {months.map((month, index) => (
                  <div
                    key={month.value}
                    className={`dropdown-item ${selectedMonth === month.value ? 'selected' : ''}`}
                    onClick={() => handleMonthChange(month.value)}
                  >
                    {month.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Year Selector */}
          <div className="dropdown-container">
            <button
              className="dropdown-trigger"
              onClick={() => setShowYearDropdown(!showYearDropdown)}
            >
              {selectedYear}
              <ChevronDown className="dropdown-icon" />
            </button>
            
            {showYearDropdown && (
              <div className="dropdown-years">
                {years.map((year, index) => (
                  <div
                    key={year}
                    className={`dropdown-item ${selectedYear === year ? 'selected' : ''}`}
                    onClick={() => handleYearChange(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="income-card">
          <h3 className="card-title">Total Income</h3>
          <p className="card-amount income-amount">
            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="expense-card">
          <h3 className="card-title">Total Expenses</h3>
          <p className="card-amount expense-amount">
            ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;