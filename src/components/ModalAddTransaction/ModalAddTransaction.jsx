import React from 'react';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import style from "./ModalAddTransaction.module.css"

const ModalAddTransaction = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className={style.closeBtn} onClick={onClose}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                        <line x1="6" y1="6" x2="18" y2="18" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <h2>Add Transaction</h2>
                <AddTransactionForm onClose={onClose} />
            </div>
        </div>
    );
};

export default ModalAddTransaction;