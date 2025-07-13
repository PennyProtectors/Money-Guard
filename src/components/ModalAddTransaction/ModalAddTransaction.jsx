import React from "react";

import css from "./ModalAddTransaction.module.css";

import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ show, onClose }) => {
  if (!show) return null;


  return (
    <div className={css.ModalBackdrop} onClick={onClose}>
      <div className={css.ModalArea} onClick={(e) => e.stopPropagation()}>
        <button className={css.ModalCloseBtn} onClick={onClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 4L4 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );

};

export default ModalAddTransaction;
