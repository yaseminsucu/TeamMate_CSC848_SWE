import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "./styles/TasksProjects.css";
import './styles/Common.css';
import ImplementLaterPopup from "./components/implementLaterPopup";
import { IoPersonCircleOutline } from "react-icons/io5";

function TasksProjectsDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description } = location.state || {};

    return (
        <div>
            <Sidebar />
            <HeaderOrganizationDash />
            <div className="main-container">
                <div className="main-content-page-alt">
                    <div className="container-page">
                        <div className="header-bar">
                            <h1>Tasks/Projects Details</h1>
                        </div>
                        <div className="content-page">
                            <div className="details-container">
                                <div className="details-top-container">
                                    <h2 className="details-title">{title}</h2>
                                </div>
                                <div className="tasks-details-subtitle-container">
                                    <p className="tasks-details-subtitle-bold">Deadline:</p>
                                    <p className="tasks-details-subtitle-normal">08/03/24</p>
                                    <p className="tasks-details-subtitle-normal">|</p>
                                    <p className="tasks-details-subtitle-bold">Submissions:</p>
                                    <p className="tasks-details-subtitle-normal">2 out of 10</p>
                                </div>
                                <div className="details-main-container">
                                    <h2 className="details-main-title">Description</h2>
                                    <p className="details-main-desc">{description}</p>
                                </div>
                                <div className="details-main-container">
                                    <h2 className="details-main-title">Content</h2>
                                    <p className="details-main-desc">N/A</p>
                                </div>
                                <div className="details-main-container">
                                    <h2 className="details-main-title">Submissions</h2>
                                    <ul className="details-member-list-container">
                                        <li className="details-member-list-item">
                                            <div className="details-member-list-person-wrapper">
                                                <IoPersonCircleOutline className="details-member-list-icon hide" size={40} />
                                                <p className="details-member-list-item-bold noicon">Name</p>
                                            </div>
                                            <p className="details-member-list-item-bold">Submitted Date</p>
                                            <p className="details-member-list-item-bold">Review</p>
                                        </li>
                                        <li className="details-member-list-item">
                                            <div className="details-member-list-person-wrapper">
                                                <IoPersonCircleOutline className="details-member-list-icon" size={40} />
                                                <p className="details-member-list-item-normal">Member 1</p>
                                            </div>
                                            <p className="details-member-list-item-normal">00/00/2024</p>
                                            <p className="details-member-list-item-normal link" onClick={() => navigate("/TasksProjectsDetailsExpand")}>View</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksProjectsDetails;
