import React, { useState } from "react";
import css from "./TransactionsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { deleteTransaction } from "../../redux/transactions/operations";
const TransactionsListDesktop = () => {
  const data = useSelector((state) => state.transaction.transactions);

  return (
    <table className={css.transactionsList_Table}>
      <thead>
        <tr
          className={[
            css.transactionsList_Table_Row,
            css.transactionsList_Table_Header,
          ].join(" ")}
        >
          <th className={css.column}>Date</th>
          <th className={css.column}>Type</th>
          <th className={css.column}>Category</th>
          <th className={css.column}>Comment</th>
          <th colSpan="1" className={css.column}>
            Sum
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0
          ? data.map((transaction) => (
              <TransactionsListDesktop_Item
                key={transaction.id}
                transaction={transaction}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};

const TransactionsListDesktop_Item = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIncome, setIsIncome] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setIsIncome(transaction.type === "INCOME");
  }, [transaction.type]);

  return (
    <tr className={css.transactionsList_Table_Row}>
      <td className={css.date}>{transaction.transactionDate}</td>
      <td className={css.type}>{transaction.type === "INCOME" ? "+" : "-"}</td>
      <td className={css.category}>{transaction.category}</td>
      <td className={css.comment}>{transaction.comment}</td>
      <td>
        <span className={css.sum}>
          <span
            className={transaction.type === "INCOME" ? css.income : css.expense}
          >
            {transaction.amount}
          </span>
        </span>
      </td>
      <td className={css.actions}>
        <div className={css.buttons}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${css.transactionItem_Button}`}
          >
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5001 5.33343L8.16672 3.0001M1.45837 12.0418L3.43259 11.8224C3.67379 11.7956 3.79439 11.7822 3.90712 11.7457C4.00713 11.7133 4.1023 11.6676 4.19006 11.6097C4.28897 11.5445 4.37478 11.4587 4.54638 11.2871L12.2501 3.58343C12.8944 2.9391 12.8944 1.89443 12.2501 1.25009C11.6057 0.605763 10.5611 0.605762 9.91672 1.25009L2.21305 8.95375C2.04144 9.12536 1.95564 9.21116 1.89041 9.31008C1.83254 9.39783 1.7868 9.49301 1.75442 9.59302C1.71793 9.70574 1.70453 9.82635 1.67773 10.0675L1.45837 12.0418Z"
                stroke="white"
                strokeOpacity="0.6"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isOpen && (
            <ModalEditTransaction
              transaction={transaction}
              onClose={() => setIsOpen(false)}
            />
          )}
          <button
            type="button"
            onClick={() => dispatch(deleteTransaction(transaction.id))}
            className={[css.transactionItem_Button, css.delete].join(" ")}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionsListDesktop;
