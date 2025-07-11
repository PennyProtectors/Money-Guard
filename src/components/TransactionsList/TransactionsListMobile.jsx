import React from "react";
import css from "./TransactionsList.module.css";

import { useSelector } from "react-redux";

const TransactionsListMobile = () => {
  const data = useSelector((state) => state.transaction.transactions);
  // const data = [];

  return (
    <div className={css.transactionsList_Area}>
      {data && data.length > 0 ? (
        data.map((transaction) => (
          <TransactionsListMobileItem
            key={transaction.id}
            transaction={transaction}
          />
        ))
      ) : (
        <p className={css.errorMessage}>No transactions found !</p>
      )}
    </div>
  );
};

const TransactionsListMobileItem = ({ transaction }) => {
  const [isIncome, setIsIncome] = React.useState(false);
  React.useEffect(() => {
    setIsIncome(transaction.type === "INCOME");
  }, [transaction.type]);

  return (
    <div
      className={
        isIncome
          ? `${css.transactionItem_Area} ${css.income}`
          : css.transactionItem_Area
      }
    >
      <div className={css.transactionItem_Row}>
        <h6 className={css.Key}>Date</h6>
        <span className={css.Value}>{transaction.transactionDate}</span>
      </div>
      <div className={css.transactionItem_Row}>
        <h6 className={css.Key}>Type</h6>
        <span className={css.Value}>
          {transaction.type === "INCOME" ? "+" : "-"}
        </span>
      </div>
      <div className={css.transactionItem_Row}>
        <h6 className={css.Key}>Category</h6>
        <span className={css.Value}>{transaction.category}</span>
      </div>
      <div className={css.transactionItem_Row}>
        <h6 className={css.Key}>Comment</h6>
        <span className={css.Value}>{transaction.comment}</span>
      </div>
      <div className={css.transactionItem_Row}>
        <h6 className={css.Key}>Sum</h6>
        <span
          className={
            transaction.type === "INCOME"
              ? `${css.Value} ${css.income}`
              : `${css.Value} ${css.expense}`
          }
        >
          {transaction.amount}
        </span>
      </div>
      <div className={[css.transactionItem_Row, css.buttons].join(" ")}>
        <button className={[css.delete, css.btn].join(" ")}>Delete</button>
        <button className={[css.edit, css.btn].join(" ")}>
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
      </div>
    </div>
  );
};

export default TransactionsListMobile;
