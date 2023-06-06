import React from 'react';
import "./modal.css";

const Modal = ({ children }) => {
  return (
    <div className="modalForStar">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
