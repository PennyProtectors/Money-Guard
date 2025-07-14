// components/Currency/Currency.jsx
import React, { useState, useEffect } from "react";
import styles from "./Currency.module.css";
import { useMediaQuery } from "react-responsive";
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  Filler,
  ChartDataLabels
);

export default function Currency() {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1281 });
  
  const [rates, setRates] = useState([
    { currency: "USD", buy: 27.55, sell: 27.65 },
    { currency: "EUR", buy: 30.00, sell: 30.10 }
  ]);
  
  // Gerçek tarihler ve saatler için son 6 saati hesapla
  const generateDateTimeLabels = () => {
    const dateTimeLabels = [];
    for (let i = 5; i >= 0; i--) {
      const dateTime = new Date();
      dateTime.setHours(dateTime.getHours() - i);
      dateTimeLabels.push(
        `${dateTime.toLocaleDateString()} ${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`
      );
    }
    return dateTimeLabels;
  };
  
  const [chartData, setChartData] = useState({
    labels: generateDateTimeLabels(),
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
  
  const [lastUpdated, setLastUpdated] = useState("");
  
  // Saatlik veri çekme için interval oluştur
  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        // API'den veri çek
        const response = await currencyApi.get("/bank/currency");
        console.log("Monobank API response:", response.data);
        
        if (response.data) {
          // Veriyi localStorage'a kaydet
          setDataToLocalStorage(response.data);
          
          // Veriyi işle
          processCurrencyData(response.data);
          
          // Son güncelleme zamanını ayarla
          const updateDate = new Date();
          setLastUpdated(
            `${updateDate.toLocaleDateString()} ${updateDate.getHours()}:${String(updateDate.getMinutes()).padStart(2, '0')}`
          );
        }
      } catch (error) {
        console.error("Döviz kurları alınırken hata oluştu:", error);
        
        // Hata durumunda localStorage'dan veri kontrolü yap
        const cachedData = getCurrencyDataFromLocalStorage();
        if (cachedData) {
          processCurrencyData(cachedData.data);
          // Son güncelleme zamanını ayarla
          const updateDate = new Date(cachedData.timestamp);
          setLastUpdated(
            `${updateDate.toLocaleDateString()} ${updateDate.getHours()}:${String(updateDate.getMinutes()).padStart(2, '0')}`
          );
        }
      }
    };

    // İlk veri çekme
    fetchCurrencyRates();
    
    // Saatlik veri çekme için interval oluştur
    const intervalId = setInterval(fetchCurrencyRates, 60 * 60 * 1000); // 1 saat
    
    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(intervalId);
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
        
        // Gerçek tarihler ve saatler için son 6 saati hesapla
        const dateTimeLabels = generateDateTimeLabels();
        
        // Son 6 saatlik veri için grafik verilerini güncelle
        // Gerçek saatlik veriler olmadığı için simüle ediyoruz
        const baseRate = usdData.rateBuy;
        const simulatedRates = [
          baseRate * (1 + (Math.random() * 0.02 - 0.01)),  // 5 saat önce
          baseRate * (1 + (Math.random() * 0.02 - 0.01)),  // 4 saat önce
          baseRate * (1 + (Math.random() * 0.02 - 0.01)),  // 3 saat önce
          baseRate * (1 + (Math.random() * 0.02 - 0.01)),  // 2 saat önce
          baseRate * (1 + (Math.random() * 0.02 - 0.01)),  // 1 saat önce
          baseRate                                         // Şu an
        ];
        
        setChartData({
          labels: dateTimeLabels,
          datasets: [{
            label: "USD/UAH",
            data: simulatedRates,
            borderColor: "#ff6384",
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            tension: 0.4,
            fill: true,
            borderWidth: isTablet ? 1.5 : 2,
            pointBackgroundColor: "#ff6384",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: isTablet || isMobile ? 3 : 5,
            pointHoverRadius: isTablet || isMobile ? 5 : 7,
            datalabels: {
              align: 'top',
              anchor: 'end',
              color: '#ffffff',
              font: {
                weight: 'bold',
                size: isTablet || isMobile ? 8 : 10
              },
              formatter: (value) => value.toFixed(2)
            }
          }]
        });
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
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            return `USD/UAH: ${context.parsed.y.toFixed(2)}`;
          }
        }
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        align: 'top',
        offset: 10,
        font: {
          weight: 'bold',
          size: isTablet || isMobile ? 8 : 10
        },
        formatter: (value) => value.toFixed(2)
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: isTablet || isMobile ? 8 : 10
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: isTablet || isMobile ? 3 : 5,
        hoverRadius: isTablet || isMobile ? 5 : 7,
        backgroundColor: "#ff6384",
        borderColor: "#ffffff",
        borderWidth: 2
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
        <Line data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
        {lastUpdated && (
          <div className={styles.lastUpdated}>
            Last updated: {lastUpdated}
          </div>
        )}
      </div>
    </div>
  );
}
