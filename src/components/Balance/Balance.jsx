import React from "react";
import { useSelector } from "react-redux";
import styles from "./Balance.module.css";
import { useMediaQuery } from "react-responsive";

const Balance = () => {
  // Redux store'dan kullanıcı bilgilerini ve işlemleri al
  const user = useSelector(state => state.auth.user);
  const transactions = useSelector(state => state.transaction.transactions);
  
  // Toplam bakiyeyi hesapla
  const calculateBalance = () => {
    if (!transactions || transactions.length === 0) {
      return user?.balance || 0;
    }
    
    // Tüm işlemlerin toplamını hesapla
    return transactions.reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);
  };
  
  const balance = calculateBalance();
  
  // Bakiyeyi manuel olarak formatla (₴ sembolü başta olacak şekilde)
  const formattedBalance = `₴ ${balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  return (
    <div className={`${styles.balanceBox} ${isTablet ? styles.tabletBalance : ''}`}>
      <p className={styles.label}>YOUR BALANCE</p>
      <p className={styles.amount}>{formattedBalance}</p>
    </div>
  );
};

export default Balance;
