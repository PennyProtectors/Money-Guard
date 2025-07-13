import React from "react";

import css from "./ModalTransaction.module.css";

import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalTransaction = ({ show, onClose }) => {
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

export default ModalTransaction;
