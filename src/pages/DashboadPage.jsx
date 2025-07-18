import React, { useState } from "react";
import css from "./DashboardPage.module.css";
import Header from "../components/Header/Header";
import Balance from "../components/Balance/Balance";
import Currency from "../components/Currency/Currency";

import StatisticsTab from "./StatisticsTab";
import ButtonAddTransactions from "../components/ButtonAddTransactions/ButtonAddTransactions";
import { useMediaQuery } from "react-responsive";
import home from "../assets/images/baseline-home-24px.png";
import stats from "../assets/images/baseline-timeline-24px.png";
import dollar from "../assets/images/baseline-timeline-24px4.png";

// Icons
import { MdHome } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { FaDollarSign } from "react-icons/fa6";

import TransactionsList from "../components/TransactionsList/TransactionsList";
import TransactionsListDesktop from "../components/TransactionsList/TransactionsListDesktop";
import TransactionsListMobile from "../components/TransactionsList/TransactionsListMobile";

import ModalTransaction from "../components/ModalTransaction/ModalTransaction";

// import { Line } from "react-chartjs-2";

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
import { Line } from "react-chartjs-2";
import { Link, Outlet, useLocation } from "react-router-dom";

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
  const location = useLocation();
  if (isTablet) {
    return (
      <div className={css.tabletDashboard}>
        <Header />
        <div className={css.tabletContent}>
          <div className={css.leftSidebar}>
            <div className={css.menuItems}>
              <div
                className={`${css.menuItem}`}
                // className={`${css.menuItem} ${
                //   activeTab === "home" ? css.active : ""
                // }`}
              >
                <img src={home} alt="Home" />
                <span>Home</span>
              </div>
              <div className={`${css.menuItem} ${css.location === "/statics"}`}>
                <Link to="/statics" className={css.menuItem}>
                  <img src={stats} alt="Statistics" />
                  <span>Statistics</span>
                </Link>
              </div>
            </div>
            <div className={`${css.balanceContainer} `}>
              <Balance />
            </div>
          </div>
          <div className={css.rightContent}>
            <Currency />
          </div>
        </div>
        {location.pathname === "/" ? (
          <ButtonAddTransactions onClick={handleOpenModal} />
        ) : null}
        {showModal && (
          <ModalTransaction show={showModal} onClose={handleCloseModal} />
        )}
        <TransactionsList />
        <Outlet />
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
            className={`${css.navItem} ${
              location.pathname === "/" ? css.activeNavItem : ""
            }`}
          >
            <Link to="/">
              <MdHome  className={css.navIcon}/>
            </Link>
          </div>
          <div
            className={`${css.navItem} ${
              location.pathname === "/statics" ? css.activeNavItem : ""
            }`}
          >
            <Link to="/statics">
              <SlGraph  className={css.navIcon}/>
            </Link>
          </div>
          <div
            className={`${css.navItem} ${
              location.pathname === "/currency" ? css.activeNavItem : ""
            }`}
          >
            <Link to="/currency">
              <FaDollarSign  className={css.navIcon}/>
            </Link>
          </div>
        </div>

        {location.pathname === "/" && (
          <div className={css.mobileContent}>
            <Balance />
            <TransactionsListMobile />
          </div>
        )}

        {location.pathname === "/statics" && (
          <div className={css.mobileContent}>
            <StatisticsTab />
          </div>
        )}

        {location.pathname === "/currency" && (
          <div className={css.mobileContent}>
            <Currency />
          </div>
        )}

        {location.pathname === "/" ? (
          <ButtonAddTransactions onClick={handleOpenModal} />
        ) : null}
        {showModal && (
          <ModalTransaction show={showModal} onClose={handleCloseModal} />
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
            <Balance />
          </div>

          <div className={css.currencySection}>
            <Currency />
          </div>
        </div>

        <div className={css.rightPanel}>
          {activeTab === "home" ? (
            <div className={css.transactionsTable}>
              <TransactionsListDesktop />
            </div>
          ) : (
            <div className={css.statisticsContent}>
              <StatisticsTab />
            </div>
          )}
        </div>
      </div>

      <ButtonAddTransactions onClick={handleOpenModal} />
      {showModal && (
        <ModalTransaction show={showModal} onClose={handleCloseModal} />
      )}
      <Outlet />
    </div>
  );
}

export default DashboardPage;
