import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import "./styles/Groups.css";
import './styles/Common.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import ImplementLaterPopup from './components/implementLaterPopup';
import { MdPeople } from "react-icons/md";

function Groups() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const orgID = Cookies.get("orgID");
    const [groups, setGroups] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            searchGroups();
        } else {
            fetchGroups();
        }
    }, [searchQuery]);

    const fetchGroups = () => {
        const options = {
            method: "GET",
        };
        fetch(`/group/get`, options)
            .then((res) => res.json())
            .then((apiResponse) => {
                if (apiResponse && apiResponse.groups) {
                setGroups(
                    apiResponse.groups
                );
                } else {
                    setGroups([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching groups:", error);
            });
        };

        const handleCreateGroup = (event) => {
            event.preventDefault();
    
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    org: orgID,
                    groupName: name,
                    groupImage: "test",
                    sortOrder: 1
                }),
            };
    
            fetch("/group/create", options)
                .then((res) => {
                    if (res.status === 200) {
                        setMessage("Success");
                        setName("");
                        setModalOpen(false);
                        fetchGroups();
                    } else {
                        res.json().then((data) => {
                            setMessage(data.error || res.status);
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error creating group:", error);
                    setMessage("An error occurred while creating the group.");
                });
        };
    
    const searchGroups = (event) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                searchQuery: searchQuery,
                searchType: "groups",
            }),
        };
        fetch("/search/ranked-search", options)
            .then((res) => res.json())
            .then((apiResponse) => {
                console.log(apiResponse);
                setGroups(apiResponse.queryResult);
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
                            <h1>Groups</h1>
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
                                <button id="create-button" onClick={() => setModalOpen(true)}><HiOutlinePlusSmall size={36} /></button>
                            </div>
                        </div>
                        <div className="content-page">
                            {groups.length === 0 ? (
                                <p className="no-groups-message">No Groups Found</p>
                            ) : (
                                <div className="groups-container">
                                    <h2>All Groups</h2>
                                    <div className="groups-list">
                                        {groups.map((group, index) => (
                                            <div key={index} className="groups-item" onClick={() => navigate("/GroupsDetails")}>
                                                <div className="groups-item-img"></div>
                                                <div className="groups-item-info">
                                                    <div className="groups-item-title-container">
                                                        <h3 className="groups-item-title">{group.groupName}</h3>
                                                        <p className="groups-item-access">Open for All</p>
                                                    </div>
                                                    <p className="groups-item-desc">{group.description}</p>
                                                    <div className="groups-item-date-container">
                                                        <MdPeople className="memberLogo" size={24} />
                                                        <p className="groups-item-date">Unlimited members</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-popup">
                    <div className="modal-content-popup">
                        <span className="close-popup"><RxCrossCircled style={{cursor: "pointer"}} size={36} onClick={() => setModalOpen(false)} /></span>
                        <h2>Create a Group</h2>
                        <form onSubmit={handleCreateGroup}>
                            <div className="form-popup-popup">
                                <label>Group Name</label>
                                <input type="text" name="name" placeholder="Type" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <button type="submit" className="popup-submit-button">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Groups;
