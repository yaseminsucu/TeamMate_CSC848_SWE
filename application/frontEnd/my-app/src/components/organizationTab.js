import React, { useState, useEffect } from "react";
import "./../styles/Sidebar.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const OrganizationTab = ({ organizationIcon, orgName, onClick, isActive }) => {
  return (
    <div className={`org-container ${isActive ? "active-org" : ""}`}>
      {isActive && <div className="active-indicator"></div>}
      <button onClick={onClick} className="button-sidebar-org">
        {organizationIcon}
      </button>
      <p className="text-sidebar">{orgName}</p>
    </div>
  );
};

const Sidebar = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgID, setSelectedOrgID] = useState(
    Cookies.get("orgID") || ""
  );
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleOrgClick = (orgID, orgName) => {
    Cookies.set("orgID", orgID);
    Cookies.set("orgName", orgName);
    setSelectedOrgID(orgID);
    navigate(`/organizationDashboard/${orgName}`);
  };

  useEffect(() => {
    getAllUserOrganizations();
  }, []);

  function getAllUserOrganizations(event) {
    const options = {
      method: "GET",
    };
    fetch("/organization/userOrgs", options)
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        setOrganizations(apiResponse.queryResult);
      });
  }

  function createUserOrganization(event) {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orgName: orgName,
        orgDescription: orgType,
      }),
    };
    fetch("/organization/create", options)
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        setOrganizations(apiResponse.queryResult);
      });
  }

  return (
    <div className="sidebar-population">
      {organizations.map((org) => (
        <OrganizationTab
          key={org.orgID}
          orgName={org.orgName}
          organizationIcon={org.orgName.charAt(0).toUpperCase()}
          onClick={() => handleOrgClick(org.orgID, org.orgName)}
          isActive={selectedOrgID == org.orgID}
        />
      ))}
    </div>
  );
};
export default Sidebar;
