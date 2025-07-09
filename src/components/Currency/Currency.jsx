// components/Currency/Currency.jsx
import React from "react";
import styles from "./Currency.module.css";
import { useMediaQuery } from "react-responsive";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Currency() {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  // Sabit döviz kurları
  const rates = [
    { currency: "USD", buy: 27.55, sell: 27.65 },
    { currency: "EUR", buy: 30.00, sell: 30.10 }
  ];
  
  // Grafik verileri
  const chartData = {
    labels: ["6 gün önce", "5 gün önce", "4 gün önce", "3 gün önce", "2 gün önce", "Bugün"],
    datasets: [
      {
        label: "USD/EUR",
        data: [27.45, 27.50, 27.55, 27.52, 27.48, 27.55],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 2
      },
      
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: isTablet ? 1 : 3,
        hoverRadius: isTablet ? 2 : 4
      },
      line: {
        borderWidth: isTablet ? 1.5 : 2
      }
    }
  };

  return (
    <div className={styles.currencyContainer}>
      <div className={styles.currencyTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Currency</div>
          <div className={styles.headerCell}>Purchase</div>
          <div className={styles.headerCell}>Sale</div>
        </div>
        {rates.map((rate, index) => (
          <div key={index} className={styles.tableRow}>
            <div className={styles.currencyCell}>{rate.currency}</div>
            <div className={styles.rateCell}>{rate.buy.toFixed(2)}</div>
            <div className={styles.rateCell}>{rate.sell.toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.chartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
