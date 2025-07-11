import React from "react";

import css from "./ModalAddTransaction.module.css";

import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={css.ModalBackdrop} onClick={onClose}>
      <div className={css.ModalArea} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>{" "}
        // svg eklenicek
        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;
