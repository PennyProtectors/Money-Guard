import React from "react";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "./ModalEditTransaction.module.css";

const ModalEditTransaction = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <EditTransactionForm transaction={transaction} onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalEditTransaction;
