// CreateOrganizationModal.js
import React from 'react';
import './component-styles/CreateOrganizationModal.css';
import '../styles/Common.css';
import { RxCrossCircled } from "react-icons/rx";

function CreateOrganizationModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-popup">
      <div className="modal-content-popup">
        <span className="close-popup">
          <RxCrossCircled style={{cursor: "pointer"}} size={36} onClick={onClose} />
        </span>
        {children}
      </div>
    </div>
  );
}

function SearchModal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-popup">
      <div className="modal-content-popup">
        <span className="close-popup">
          <RxCrossCircled style={{cursor: "pointer"}} size={36} onClick={onClose} />
        </span>
        {children}
      </div>
    </div>
  );
}

export { CreateOrganizationModal, SearchModal};
