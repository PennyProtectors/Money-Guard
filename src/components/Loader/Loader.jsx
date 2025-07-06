import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = ({ loading = false }) => {
  if (!loading) return null;

  return (
    <div className={styles.loaderContainer}>
      <div style={{ textAlign: 'center' }}>
        <Oval height={80} width={80} color="#007bff" secondaryColor="#eee" strokeWidth={4} visible={true} ariaLabel="oval-loading" />
        <p style={{ marginTop: '20px', color: '#666', fontSize: '16px' }}>
          Yükleniyor...
        </p>
      </div>
    </div>
  );
};

export default Loader; 