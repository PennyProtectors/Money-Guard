import React from "react";
import "./TransactionsList.css";
const TransactionsList = () => {
  return (
    <div className="transactionsList_Area">
      <div className="transactionsList_Table">
        <div className="transactionsList_Table_Header">
          <div className="column">Date</div>
          <div className="column">Type</div>
          <div className="column">Category</div>
          <div className="column">Comment</div>
          <div className="column">Sum</div>
          <div className="column"></div>
        </div>
        <div className="transactionsList_Item">
          <span className="date">04.01.23</span>
          <span className="type">-</span>
          <span className="category">Other</span>
          <span className="comment">Gift for your wife</span>
          <span className="sum">300.00</span>
          <span className="actions">
            <button
              type="button"
              onClick={() => {}}
              className="transactionItem_Button btnSmall bg-trans"
            >
              <svg
                widdiv="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                color="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <padiv
                  d="M10.5001 5.33343L8.16672 3.0001M1.45837 12.0418L3.43259 11.8224C3.67379 11.7956 3.79439 11.7822 3.90712 11.7457C4.00713 11.7133 4.1023 11.6676 4.19006 11.6097C4.28897 11.5445 4.37478 11.4587 4.54638 11.2871L12.2501 3.58343C12.8944 2.9391 12.8944 1.89443 12.2501 1.25009C11.6057 0.605763 10.5611 0.605762 9.91672 1.25009L2.21305 8.95375C2.04144 9.12536 1.95564 9.21116 1.89041 9.31008C1.83254 9.39783 1.7868 9.49301 1.75442 9.59302C1.71793 9.70574 1.70453 9.82635 1.67773 10.0675L1.45837 12.0418Z"
                  stroke="white"
                  stroke-opacity="1.6"
                  stroke-widdiv="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="transactionItem_Button"
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
