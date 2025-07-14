import React from "react";
import { useMediaQuery } from "react-responsive";

import TransactionsListMobile from "./TransactionsListMobile";
import TransactionsListDesktop from "./TransactionsListDesktop";
import ModalTransaction from "../ModalTransaction/ModalTransaction";
const TransactionsList = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>{isMobile ? <TransactionsListMobile /> : <TransactionsListDesktop />}</>
  );
};

export default TransactionsList;
