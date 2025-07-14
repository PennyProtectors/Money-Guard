import React from "react";

import css from "./ModalTransaction.module.css";

import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";

const ModalTransaction = ({ show, onClose, type, data }) => {
  if (!show) return null;

  return (
    <div className={css.ModalBackdrop} onClick={onClose}>
      <div className={css.ModalArea} onClick={(e) => e.stopPropagation()}>
        <button className={css.ModalCloseBtn} onClick={onClose}>
          X
        </button>
        {type === "edit" && (
          <EditTransactionForm data={data} onClose={onClose} />
        )}
        {type === "add" && <AddTransactionForm onClose={onClose} />}
      </div>
    </div>
  );
};

export default ModalTransaction;
