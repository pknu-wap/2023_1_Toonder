import React from 'react';
import "./modal.css";

const Modal = ({ onSave, onClose, children }) => {
  return (
    <div className="modalForStar">
      <div className="modal-content">
        {children}
        <button style={{position:'relative', top:'10%', fontSize:'20px'}} onClick={onSave}>확인</button>
        <button style={{position:'relative', top:'20%'}} onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default Modal;
