import React from 'react';

const ModalAddTransaction = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>   // svg eklenicek
                <AddTransactionForm onClose={onClose} />
            </div>
        </div>
    );
};

export default ModalAddTransaction;