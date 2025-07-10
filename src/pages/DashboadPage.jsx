import React, { useState } from "react";
import css from "./DashboardPage.module.css";
import Header from "../components/Header";
import Balance from "../components/Balance/Balance";
import Currency from "../components/Currency/Currency";
import Dashboard from "../components/Dashboard";
import { useMediaQuery } from "react-responsive";
import home from "../assets/images/baseline-home-24px 3.png";
import stats from "../assets/images/baseline-timeline-24px 3.png";
import dollar from "../assets/images/baseline-timeline-24px 4.png";
import ButtonAddTransactions from "../components/ButtonAddTransactions/ButtonAddTransactions";
import ModalAddTransaction from "../components/ModalAddTransaction/ModalAddTransaction";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [showModal, setShowModal] = useState(false);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
      <div>
        <div className={css.paths}>
          <img
            src={home}
            alt="home"
            onClick={() => setActiveTab("home")}
            className={activeTab === "home" ? css.activeTab : ""}
          />
          <img
            src={stats}
            alt="statistics"
            onClick={() => setActiveTab("stats")}
            className={activeTab === "stats" ? css.activeTab : ""}
          />
        </div>

        {activeTab === "home" ? (
          <main className={css.content}>
            <Balance />
            <Dashboard />
          </main>
        ) : (
          <main className={css.content}>
            <Dashboard />
          </main>
        )}
      </div>
      <ButtonAddTransactions onClick={handleOpenModal} />
      {showModal && (
        <ModalAddTransaction show={showModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default DashboardPage;
