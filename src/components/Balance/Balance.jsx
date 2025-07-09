// import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

export default function Balance() {
  const totalBalance = 12345.67; // test amaçlı sabit veri

  return (
    <div className={styles.balanceBox}>
      <p className={styles.label}>Your balance</p>
      <p className={styles.amount}>₴ {totalBalance.toFixed(2)}</p>
    </div>
  );
}
