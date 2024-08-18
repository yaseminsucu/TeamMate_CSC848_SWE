import React, { useState } from "react";
import "./styles/Sidebar.css";
import CreateOrganizationModal from "./CreateOrganizationModal";
import ImplementLaterPopup from "./components/implementLaterPopup";
import { PiPlusBold } from "react-icons/pi";
import { BsGlobe2 } from "react-icons/bs";
import OrganizationTab from "./components/organizationTab";

const Sidebar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="maincontent-sidebar">
      <h2 className="title-sidebar">Organization</h2>
      <div className="top-section-sidebar">
        <div className="org-container">
          <button
            className="button-sidebar"
            onClick={() => setModalIsOpen(true)}
          >
            <PiPlusBold size={36} className="iconWhite"/>
          </button>
          <p className="text-sidebar">Create</p>
        </div>
        <OrganizationTab organizationIcon="1" orgnzationName="Organization 1" />
      </div>
      <CreateOrganizationModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
