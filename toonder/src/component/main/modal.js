import React from 'react';
import "./modal.css";

const Modal = ({ onSave, onClose, children }) => {
  return (
    <div className="modalForStar">
      <div className="modal-content">
        {children}
        
      </div>
    </div>
  );
};

export default Modal;
