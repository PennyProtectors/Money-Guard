import React from "react";
import css from "./ButtonAddTransactions.module.css";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
const ButtonAddTransactions = () => {
  const [isModaAddTransactionOpen, setIsModalAddTransactionOpen] =
    React.useState(false);
  const toggleModalHandler = () =>
    setIsModalAddTransactionOpen(!isModaAddTransactionOpen);

  return (
    <>
      <ModalAddTransaction
        show={isModaAddTransactionOpen}
        onClose={toggleModalHandler}
      />
      <button onClick={toggleModalHandler} className={css.buttonAddTransaction}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 0V20" stroke="white" strokeWidth="2" />
          <path d="M0 10L20 10" stroke="white" strokeWidth="2" />
        </svg>
      </button>
    </>
  );
};

export default ButtonAddTransactions;
