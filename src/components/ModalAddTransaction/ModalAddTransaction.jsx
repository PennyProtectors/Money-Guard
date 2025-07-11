import React from "react";

import css from "./ModalAddTransaction.module.css";

import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={css.ModalBackdrop} onClick={onClose}>
      <div className={css.ModalArea} onClick={(e) => e.stopPropagation()}>
        <button className={css.ModalCloseBtn} onClick={onClose}>
          X
        </button>
        
        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;
