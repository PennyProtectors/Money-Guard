import React from "react";
import styles from "./Balance.module.css";
import { useMediaQuery } from "react-responsive";

const Balance = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  return (
    <div className={`${styles.balanceBox} ${isTablet ? styles.tabletBalance : ''}`}>
      <p className={styles.label}>YOUR BALANCE</p>
      <p className={styles.amount}>₴ 24 000.00</p>
    </div>
  );
};

export default Balance;
