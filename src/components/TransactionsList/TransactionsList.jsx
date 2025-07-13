import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import TransactionsListMobile from "./TransactionsListMobile";
import TransactionsListDesktop from "./TransactionsListDesktop";
import ModalTransaction from "../ModalTransaction/ModalTransaction";
const TransactionsList = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [
    isDeleteTransactionConfirmModalOpen,
    setIsDeleteTransactionConfirmModalOpen,
  ] = useState(false);
  const [deleteTransactionData, setDeleteTransactionData] = useState(null);

  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [editTransactionData, setEditTransactionData] = useState(null);

  useEffect(() => {
    console.log("Edit Transaction Data Updated:", editTransactionData);
    if (editTransactionData) {
      setIsEditTransactionModalOpen(true);
    }
  }, [editTransactionData]);
  return (
    <>
      <ModalTransaction
        show={isDeleteTransactionConfirmModalOpen}
        type={"delete"}
        data={deleteTransactionData}
        onClose={() => setIsDeleteTransactionConfirmModalOpen(false)}
      />
      <ModalTransaction
        show={isEditTransactionModalOpen}
        type={"edit"}
        data={editTransactionData}
        onClose={() => setIsEditTransactionModalOpen(false)}
      />

      {isMobile ? (
        <TransactionsListMobile
          // toggleDeleteConfirm={setIsDeleteTransactionConfirmModalOpen}
          setDeleteTransactionData={setDeleteTransactionData}
          setEditTransactionData={setEditTransactionData}
        />
      ) : (
        <TransactionsListDesktop
          // toggleDeleteConfirm={setIsDeleteTransactionConfirmModalOpen}
          setDeleteTransactionData={setDeleteTransactionData}
          setEditTransactionData={setEditTransactionData}
        />
      )}
    </>
  );
};

export default TransactionsList;
