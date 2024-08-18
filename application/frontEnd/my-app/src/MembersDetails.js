import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import Sidebar from "./Sidebar";
import "./styles/Members.css";
import "./styles/Common.css";
import ImplementLaterPopup from "./components/implementLaterPopup";
import { IoPersonCircleOutline } from "react-icons/io5";
import Cookies from "js-cookie";

function MembersDetails() {
  const location = useLocation();
  const { firstName, lastName, orgPerms, group } = location.state || {};

  const getGroup = (group) => {
    if (!group) {
      return "N/A";
    }
  };

  const getRole = (orgPerms) => {
    switch (orgPerms) {
      case 1:
        return "Leader";
      case 2:
        return "Admin";
      case 3:
        return "Member";
      default:
        return orgPerms;
    }
  };

  return (
    <div>
      <Sidebar />
      <HeaderOrganizationDash />
      <div className="main-container">
        <div className="main-content-page-alt">
          <div className="container-page">
            <div className="header-bar">
              <h1>
                {firstName} {lastName}'s Profile
              </h1>
            </div>
            <div className="content-page">
              <div className="details-container">
                <div className="details-top-container">
                  <div className="member-profile-name-img-container">
                    <IoPersonCircleOutline
                      className="member-profile-img"
                      size={72}
                    />
                    <h2 className="details-title">
                      {firstName} {lastName}
                    </h2>
                  </div>
                </div>
                <div className="details-main-container">
                  <h2 className="details-main-title">Profile</h2>
                  <div className="member-profile-info-container">
                    <div className="member-profile-seperator">
                      <p className="member-profile-details">Group:</p>
                      <p className="member-profile-details">Role:</p>
                    </div>
                    <div className="member-profile-seperator">
                      <p className="member-profile-details">{getGroup(group)}</p>
                      <p className="member-profile-details">
                        {getRole(orgPerms)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="details-main-container">
                  <h2 className="details-main-title">Recognition</h2>
                  <div className="member-profile-recognition-container">
                    <p>No Recognitions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembersDetails;
