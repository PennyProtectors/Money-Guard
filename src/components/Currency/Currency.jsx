import { useEffect, useState } from 'react';
import styles from './Currency.module.css';
import axios from 'axios';

export default function Currency() {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const fetchCurrency = async () => {
      const lastFetch = localStorage.getItem('currencyTimestamp');
      const now = Date.now();

      if (lastFetch && now - Number(lastFetch) < 3600000) {
        const cachedData = JSON.parse(localStorage.getItem('currencyData'));
        if (cachedData) {
          setCurrencyData(cachedData);
          return;
        }
      }

      try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const filtered = response.data.filter(
          item => item.currencyCodeA === 840 || item.currencyCodeA === 978
        );
        setCurrencyData(filtered);
        localStorage.setItem('currencyData', JSON.stringify(filtered));
        localStorage.setItem('currencyTimestamp', now.toString());
      } catch (error) {
        console.error('Currency fetch error:', error.message);
      }
    };

    fetchCurrency();
  }, []);

  return (
    <div className={styles.wrapper}>
      {currencyData.map((item, index) => (
        <div className={styles.row} key={index}>
          <span>{item.currencyCodeA === 840 ? 'USD' : 'EUR'}</span>
          <span>
            {item.rateSell ? item.rateSell.toFixed(2) : '---'} ₴
          </span>
        </div>
      ))}
    </div>
  );
}
