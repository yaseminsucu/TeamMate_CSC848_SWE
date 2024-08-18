import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./styles/Members.css";
import "./styles/Common.css";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import { AddMemberModal, SearchModal } from "./components/addMemberModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

Modal.setAppElement("#root");

function Members() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchFilterOrgPerms, setSearchFilterOrgPerms] = useState(0);
  const [searchFilterGroup, setSearchFilterGroup] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgPerms, setOrgPerms] = useState("");
  const [group, setGroup] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(Cookies.get("orgID") || null);
  const [message, setMessage] = useState("");

  const getAllOrganizationMembers = (event) => {
    const options = {
      method: "GET",
    };
    fetch("/member/getMembers", options)
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        setMembers(apiResponse.members);
      });
  };

  useEffect(() => {
    if (selectedOrg) {
      getAllOrganizationMembers();
      const intervalId = setInterval(getAllOrganizationMembers, 60000);

      return () => clearInterval(intervalId);
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (searchQuery) {
      searchMembersInOrgAndRank();
    } else {
      getAllOrganizationMembers();
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "userID":
        setUserID(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "orgPerms":
        setOrgPerms(value);
        break;
      case "group":
        setGroup(value);
        break;
      default:
        break;
    }
  };

  const handleAddMember = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: JSON.stringify({
        org: Cookies.get("orgID"),
        user: userID,
        firstName: firstName,
        lastName: lastName,
        orgPerms: orgPerms,
        group: group,
      }),
    };
    fetch("/member/addMember", options).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        setModalOpen(false);
        getAllOrganizationMembers();
      } else {
        setMessage(res.statusText);
      }
    });
  };

  const searchMembersInOrgAndRank = (event) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: searchQuery,
        searchType: "members",
      }),
    };
    fetch("/search/ranked-search", options)
      .then((res) => res.json())
      .then((apiResponse) => {
        console.log(apiResponse);
        setMembers(apiResponse.queryResult);
        if (apiResponse.status === 200) {
          alert("Search Query Successful");
        }
      });
  };

  return (
    <div>
      <Sidebar />
      <HeaderOrganizationDash />
      <div className="main-container">
        <div className="main-content-page">
          <div className="container-page">
            <div className="header-bar">
              <h1>Members</h1>
              <div className="search-create">
                <div className="search-bar-container">
                  <FaMagnifyingGlass size={20} className="search-icon" />
                  <input
                    className="textarea"
                    type="text"
                    id="search"
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button id="create-button" onClick={() => setModalOpen(true)}>
                  <HiOutlinePlusSmall size={36} />
                </button>
              </div>
            </div>
            <div className="content-page">
              {members.length === 0 ? (
                <p className="no-tasks-message">No Members</p>
              ) : (
                <div className="members-alt-container">
                  <ul className="details-member-list-container">
                    <li className="details-member-list-item">
                      <div className="details-member-list-person-wrapper">
                        <IoPersonCircleOutline
                          className="member-list-hidden-icon"
                          size={40}
                        />
                        <p className="details-member-list-item-bold noicon">
                          Name
                        </p>
                      </div>
                      <p className="details-member-list-item-bold">Group</p>
                      <p className="details-member-list-item-bold">Role</p>
                      <p className="details-member-list-item-bold"></p>
                    </li>
                    {members.map((member, index) => (
                      <li key={index} className="details-member-list-item">
                        <div className="details-member-list-person-wrapper">
                          <IoPersonCircleOutline
                            className="details-member-list-icon"
                            size={40}
                          />
                          <p className="details-member-list-item-normal">
                            {member.firstName} {member.lastName}
                          </p>
                        </div>
                        <p className="details-member-list-item-normal">
                          {member.group}
                        </p>
                        <p className="details-member-list-item-normal">
                          {member.orgPerms}
                        </p>
                        <p
                          className="details-member-list-item-normal link"
                          onClick={() =>
                            navigate(`/MembersDetails/${member.memberID}`, {
                              state: {
                                firstName: member.firstName,
                                lastName: member.lastName,
                                orgPerms: member.orgPerms,
                                group: member.group,
                              },
                            })
                          }
                        >
                          <SlOptions />
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        >
          <h2>Add Member</h2>
          <form className="addMemberForm" onSubmit={handleAddMember}>
            <div className="form-popup-popup">
              <label>Member's ID</label>
              <input
                className="input-fields-add-member"
                type="text"
                name="userID"
                value={userID}
                onChange={handleInputChange}
                placeholder="Insert User ID"
              />
            </div>
            <div className="form-popup-popup">
              <label>Assign Role</label>
              <select name="recognitionType" placeholder="Select">
                <option value="0" disabled selected hidden>
                  Select
                </option>
                <option value="1">Member</option>
                <option value="2">Leader</option>
                <option value="3">Admin</option>
              </select>
            </div>
            <button type="submit">Add</button>
            {message && <p className="error-message">{message}</p>}
          </form>
        </AddMemberModal>
      )}
      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        >
          <h2>Search Members</h2>
          <form
            className="searchMemberForm"
            onSubmit={searchMembersInOrgAndRank}
          >
            <label>
              Search Query
              <input
                className="input-fields-add-member"
                type="text"
                name="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Query"
              />
            </label>
            <br />
            <label>
              Search Type
              <input
                className="input-fields-add-member"
                type="text"
                name="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                placeholder="Search Type"
              />
            </label>
            <br />
            <label>
              Org Permissions Filter
              <input
                className="input-fields-add-member"
                type="number"
                name="searchFilterOrgPerms"
                value={searchFilterOrgPerms}
                onChange={(e) =>
                  setSearchFilterOrgPerms(Number(e.target.value))
                }
                placeholder="Permissions Filter"
              />
            </label>
            <br />
            <label>
              Group Filter (Cannot be 0)
              <input
                className="input-fields-add-member"
                type="number"
                name="searchFilterGroup"
                value={searchFilterGroup}
                onChange={(e) => setSearchFilterGroup(Number(e.target.value))}
                placeholder="Group Filter"
              />
            </label>
            <br />
            <button type="submit">Search</button>
          </form>
        </SearchModal>
      )}
    </div>
  );
}

export default Members;

function displayOrgPerms(orgPerms) {
  if (orgPerms === 1) {
    return "Leader";
  } else if (orgPerms === 2) {
    return "Member";
  }
}
