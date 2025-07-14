import React, { useState } from "react";
import css from "./DashboardPage.module.css";
import Header from "../components/Header";
import Balance from "../components/Balance/Balance";
import Currency from "../components/Currency/Currency";
import Dashboard from "../components/Dashboard";
import ButtonAddTransactions from "../components/ButtonAddTransactions/ButtonAddTransactions";
import { useMediaQuery } from "react-responsive";
import home from "../assets/images/baseline-home-24px 3.png";
import stats from "../assets/images/baseline-timeline-24px 3.png";
import dollar from "../assets/images/baseline-timeline-24px 4.png";
import ModalAddTransaction from "../components/ModalAddTransaction/ModalAddTransaction";

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
  Filler,
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


function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [showModal, setShowModal] = useState(false);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Grafik verileri
  const chartData = {
    labels: [
      "6 gün önce",
      "5 gün önce",
      "4 gün önce",
      "3 gün önce",
      "2 gün önce",
      "Bugün",
    ],
    datasets: [
      {
        label: "USD/EUR",
        data: [27.45, 27.5, 27.55, 27.52, 27.48, 27.55],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 4,
      },
      line: {
        borderWidth: 2,
      },
    },
  };


  if (isTablet) {
    return (
      <div className={css.tabletDashboard}>
        <Header />
        <div className={css.tabletContent}>
          <div className={css.leftSidebar}>
            <div className={css.menuItems}>
              <div
                className={`${css.menuItem} ${activeTab === "home" ? css.active : ""
                  }`}
                onClick={() => setActiveTab("home")}
              >
                <img src={home} alt="Home" />
                <span>Home</span>
              </div>
              <div
                className={`${css.menuItem} ${activeTab === "stats" ? css.active : ""
                  }`}
                onClick={() => setActiveTab("stats")}
              >
                <img src={stats} alt="Statistics" />
                <span>Statistics</span>
              </div>
            </div>
            <div className={css.balanceContainer}>
              <Balance />
            </div>
          </div>
          <div className={css.rightContent}>
            <Currency />
          </div>
        </div>
        <ButtonAddTransactions onClick={handleOpenModal} />
        {showModal && (
          <ModalAddTransaction show={showModal} onClose={handleCloseModal} />
        )}
      </div>
    );
  }

  // Mobil görünümü için yeni tasarım
  if (isMobile) {
    return (
      <div className={css.mobileDashboard}>
        <Header />
        <div className={css.mobileNavigation}>
          <div
            className={`${css.navItem} ${activeTab === "home" ? css.activeNavItem : ""
              }`}
            onClick={() => setActiveTab("home")}
          >
            <img src={home} alt="Home" />
          </div>
          <div
            className={`${css.navItem} ${activeTab === "stats" ? css.activeNavItem : ""
              }`}
            onClick={() => setActiveTab("stats")}
          >
            <img src={stats} alt="Statistics" />
          </div>
          <div
            className={`${css.navItem} ${activeTab === "currency" ? css.activeNavItem : ""
              }`}
            onClick={() => setActiveTab("currency")}
          >
            <img src={dollar} alt="Currency" />
          </div>
        </div>

        {activeTab === "home" && (
          <div className={css.mobileContent}>
            <Balance />
          </div>
        )}

        {activeTab === "stats" && (
          <div className={css.mobileContent}>
            <Dashboard />
          </div>
        )}

        {activeTab === "currency" && (
          <div className={css.mobileContent}>
            <Currency />
          </div>
        )}
        <ButtonAddTransactions onClick={handleOpenModal} />
        {showModal && (
          <ModalAddTransaction show={showModal} onClose={handleCloseModal} />
        )}
      </div>
    );
  }

  // Desktop görünümü
  return (
    <div className={css.dashboard}>
      <Header />
      <div className={css.desktopContent}>
        <div className={css.leftPanel}>
          <div className={css.menuContainer}>
            <div
              className={`${css.menuItem} ${
                activeTab === "home" ? css.active : ""
              }`}
              onClick={() => setActiveTab("home")}
            >
              <img src={home} alt="Home" />
              <span>Home</span>
            </div>
            <div
              className={`${css.menuItem} ${
                activeTab === "stats" ? css.active : ""
              }`}
              onClick={() => setActiveTab("stats")}
            >
              <img src={stats} alt="Statistics" />
              <span>Statistics</span>
            </div>
          </div>

          <div className={css.balanceSection}>
            <p className={css.balanceLabel}>YOUR BALANCE</p>
            <p className={css.balanceAmount}>₴ 24 000.00</p>
          </div>

          <div className={css.currencySection}>
            <div className={css.currencyHeader}>
              <div className={css.currencyHeaderCell}>Currency</div>
              <div className={css.currencyHeaderCell}>Purchase</div>
              <div className={css.currencyHeaderCell}>Sale</div>
            </div>
            <div className={css.currencyRow}>
              <div className={css.currencyCell}>USD</div>
              <div className={css.currencyCell}>27.55</div>
              <div className={css.currencyCell}>27.65</div>
            </div>
            <div className={css.currencyRow}>
              <div className={css.currencyCell}>EUR</div>
              <div className={css.currencyCell}>30.00</div>
              <div className={css.currencyCell}>30.10</div>
            </div>
            <div className={css.currencyChart}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className={css.rightPanel}>
          {activeTab === "home" ? (
            <div className={css.transactionsTable}>
              {/* Transactions table content */}
            </div>
          ) : (
            <div className={css.statisticsContent}>
              <Dashboard />
            </div>
          )}
        </div>
      </div>

      <ButtonAddTransactions onClick={handleOpenModal} />
      {showModal && (
        <ModalAddTransaction show={showModal} onClose={handleCloseModal} />
      )}

    </div>
  );
}

export default DashboardPage;
