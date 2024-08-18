import React, { useState } from "react";
import "./component-styles/implementLaterPopup.css";
import logo from "../images/TeamMate_Logo.png";
import { RxCrossCircled } from "react-icons/rx";

const ImplementLaterPopup = ({ onClick, className, children}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    setShowPopup(true);
  };

  const closeButton = (e) => {
    if (onClick) {
      onClick(e);
    }
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      {showPopup && (
        <div className="popupContainer">
          <div className="popup">
            <span className="close-popup"><RxCrossCircled style={{cursor: "pointer"}} size={32} onClick={closeButton} /></span>
            <img src={logo} alt="TeamMate Logo" className="popupLogo" />
            <p className="wip-main">Will be implemented in the future.</p>
            <p className="wip-footer">– TeamMate Development Team</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImplementLaterPopup;