import React from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Chart.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  // Get statistics from Redux store
  const statistics = useSelector(state => state.transaction?.statistics || {});
  const categoryExpenses = statistics.categoryExpenses || [];
  
  // Mock data for demonstration - replace with actual data from Redux
  const mockData = [
    { category: 'Food', amount: 1200, color: '#FF6B6B' },
    { category: 'Transport', amount: 800, color: '#4ECDC4' },
    { category: 'Entertainment', amount: 500, color: '#45B7D1' },
    { category: 'Shopping', amount: 900, color: '#96CEB4' },
    { category: 'Bills', amount: 1500, color: '#FFEAA7' },
    { category: 'Other', amount: 300, color: '#DDA0DD' }
  ];

  // Use mock data if no real data available
  const chartData = categoryExpenses.length > 0 ? categoryExpenses : mockData;

  const data = {
    labels: chartData.map(item => item.category),
    datasets: [
      {
        data: chartData.map(item => item.amount),
        backgroundColor: chartData.map(item => item.color),
        borderColor: chartData.map(item => item.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  // Calculate total expenses for center display
  const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="chart-container">
      <h3 className="chart-title">
        Expenses by Category
      </h3>
      
      <div className="chart-wrapper">
        {chartData.length > 0 ? (
          <>
            <Doughnut data={data} options={options} />
            {/* Center text overlay */}
            <div className="chart-center-text">
              <div className="center-content">
                <p className="total-label">Total</p>
                <p className="total-amount">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="no-data-container">
            <div className="no-data-content">
              <p className="no-data-title">No expenses data available</p>
              <p className="no-data-subtitle">Add some transactions to see the chart</p>
            </div>
          </div>
        )}
      </div>

      {/* Legend for mobile */}
      <div className="mobile-legend">
        <div className="legend-grid">
          {chartData.map((item, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-label">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;