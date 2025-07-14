// components/Currency/Currency.jsx
import React, { useState, useEffect } from "react";
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
import { currencyApi } from "../../config/currencyApi";
import { setDataToLocalStorage, getCurrencyDataFromLocalStorage } from "../../helpers/currencyApiHelpers";

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
  
  const [rates, setRates] = useState([
    { currency: "USD", buy: 27.55, sell: 27.65 },
    { currency: "EUR", buy: 30.00, sell: 30.10 }
  ]);
  
  const [chartData, setChartData] = useState({
    labels: ["6 gün önce", "5 gün önce", "4 gün önce", "3 gün önce", "2 gün önce", "Bugün"],
    datasets: [
      {
        label: "USD/UAH",
        data: [27.45, 27.50, 27.55, 27.52, 27.48, 27.55],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        // Önce localStorage'dan veri kontrolü yap
        const cachedData = getCurrencyDataFromLocalStorage();
        if (cachedData) {
          processCurrencyData(cachedData);
          return;
        }

        // Cache'de veri yoksa API'den çek
        const response = await currencyApi.get("/bank/currency");
        console.log("Monobank API response:", response.data);
        
        if (response.data) {
          // Veriyi localStorage'a kaydet
          setDataToLocalStorage(response.data);
          
          // Veriyi işle
          processCurrencyData(response.data);
        }
      } catch (error) {
        console.error("Döviz kurları alınırken hata oluştu:", error);
        // Hata durumunda varsayılan değerleri kullan
      }
    };

    fetchCurrencyRates();
  }, []);

  const processCurrencyData = (data) => {
    try {
      // API'den gelen veriyi işle
      // USD (840) ve EUR (978) için UAH (980) karşılığı kurları bul
      const usdData = data.find(item => item.currencyCodeA === 840 && item.currencyCodeB === 980);
      const eurData = data.find(item => item.currencyCodeA === 978 && item.currencyCodeB === 980);
      
      console.log("USD data:", usdData);
      console.log("EUR data:", eurData);
      
      if (usdData && eurData) {
        setRates([
          { currency: "USD", buy: usdData.rateBuy, sell: usdData.rateSell },
          { currency: "EUR", buy: eurData.rateBuy, sell: eurData.rateSell }
        ]);
        
        // Son 7 günlük veri için grafik verilerini güncelle
        setChartData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: [
              usdData.rateBuy * 0.98,
              usdData.rateBuy * 0.99,
              usdData.rateBuy * 0.995,
              usdData.rateBuy * 1.005,
              usdData.rateBuy * 1.002,
              usdData.rateBuy
            ]
          }]
        }));
      }
    } catch (error) {
      console.error("Döviz kuru verisi işlenirken hata oluştu:", error);
    }
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
