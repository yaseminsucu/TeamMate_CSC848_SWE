import React, { useState, useEffect } from "react";
import "./styles/dashboard.css";
import Footer from "./Footer";
import Sidebar from './Sidebar';
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import CreateOrganizationModal from "./CreateOrganizationModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './styles/Common.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [Orgname, setName] = useState("");
  const [Orgtype, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUserOrganizations();
  }, []);

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleOrgNameChange(event) {
    setName(event.target.value);
  }

  function handleOrgTypeChange(event) {
    setType(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("You searched for: " + searchTerm);
  }

  function handleAutoComplete(event) {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: searchQuery,
      }),
    };
  }

  function handleCreateOrganization(event) {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify({
        orgName: Orgname,
        orgDescription: Orgtype,
      }),
    };
    fetch("/organization/create", options)
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        if (apiResponse.message === "Organization created successfully") {
          alert("Organization created successfully");
          setModalOpen(false);
          navigate(`/organizationDashboard/${Orgname}`);
        } else {
          alert("Failed to create organization");
        }
      });
  }

  function handleSearchOrganization(event) {
    event.preventDefault();
    alert("You searched with a criteria" + searchQuery);
  }

  function handleMemberSearch(event) {}

  function getAllUserOrganizations() {
    const options = {
      method: "GET",
    };
    fetch("/organization/userOrgs", options)
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        setOrganizations(apiResponse.queryResult);
        setSearchResults(apiResponse.queryResult);
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "searchQuery") {
        setSearchQuery(value);
    }
  };

  return (
    <div>
        <Sidebar />
        <HeaderNavigation />
        <div className="main-container">
            <div className="main-content-page">
                <div className="container-page">
                    <div className="header-bar">
                        <h1>Dashboard</h1>
                        <div className="search-create">
                          <button id="create-button" onClick={() => setModalOpen(true)}><HiOutlinePlusSmall size={36} /></button>
                        </div>
                    </div>
                    <div className="content-page">
                        <p className="no-dashboard-message">Create, join, or select an organization to get started</p>
                    </div>
                </div>
            </div>
        </div>
        <CreateOrganizationModal
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
        />
    </div>
  );
}

export default Dashboard;
