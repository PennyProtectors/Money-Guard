import React from 'react';
import Header from '../components/Header';
import Balance from '../components/Balance/Balance';
import Currency from '../components/Currency/Currency';
import css from './DashboardPage.module.css';

function DashboardPage() {
  return (
    <div className={css.dashboard}>
      <Header />

      <main className={css.content}>
        <Balance />
        <Currency />
      </main>
    </div>
  );
}

export default DashboardPage;
