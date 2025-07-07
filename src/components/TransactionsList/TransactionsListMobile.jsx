import React from "react";
import css from "./TransactionsList.module.css";

const TransactionsListMobile = () => {
  const data = [
    {
      id: "623eabe4-5175-469e-a710-63840c417172",
      transactionDate: "2025-07-07",
      type: "INCOME",
      comment: "Test",
      amount: 1000,
      balanceAfter: 1000,
      categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
      userId: "5a51b69b-9cef-4e02-8433-150da878aebb",
    },
    {
      id: "ef93d8e4-3732-4a6c-9130-9a0554e09f11",
      transactionDate: "2025-07-07",
      type: "EXPENSE",
      comment: "Fuel",
      amount: -2100.3,
      balanceAfter: -1100.3000000000002,
      categoryId: "3caa7ba0-79c0-40b9-ae1f-de1af1f6e386",
      userId: "5a51b69b-9cef-4e02-8433-150da878aebb",
    },
    {
      id: "56c15039-f44c-4aab-87b7-2c2f2e9919fc",
      transactionDate: "2025-07-07",
      type: "EXPENSE",
      comment: "Quiz Book",
      amount: -500,
      balanceAfter: -1600.3000000000002,
      categoryId: "1272fcc4-d59f-462d-ad33-a85a075e5581",
      userId: "5a51b69b-9cef-4e02-8433-150da878aebb",
    },
    {
      id: "90746ba6-f962-4543-8397-ac7ead289bfb",
      transactionDate: "2025-07-07",
      type: "EXPENSE",
      comment: "Bag",
      amount: -1375.85,
      balanceAfter: -2976.15,
      categoryId: "76cc875a-3b43-4eae-8fdb-f76633821a34",
      userId: "5a51b69b-9cef-4e02-8433-150da878aebb",
    },
  ];
  return (
    <div className={css.transactionsList_Area}>
      {data.map((transaction) => (
        <TransactionsListMobileItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}
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
        <span className={css.Value}>Other</span>
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
          Edit
        </button>
      </div>
    </div>
  );
};

export default TransactionsListMobile;
