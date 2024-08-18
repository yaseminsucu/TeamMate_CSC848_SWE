import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "./styles/Events.css";
import './styles/Common.css';
import ImplementLaterPopup from "./components/implementLaterPopup";
import { IoPersonCircleOutline } from "react-icons/io5";

function EventsDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description, date } = location.state || {};


    return (
        <div>
            <Sidebar />
            <HeaderOrganizationDash />
            <div className="main-container">
                <div className="main-content-page-alt">
                    <div className="container-page">
                        <div className="header-bar">
                            <h1>Events Details</h1>
                        </div>
                        <div className="content-page">
                            <div className="details-container">
                                <div className="details-top-container">
                                    <h2 className="details-title">{title}</h2>
                                </div>
                                <div className="tasks-details-subtitle-container">
                                    <p className="tasks-details-subtitle-bold">Date and Time:</p>
                                    <p className="tasks-details-subtitle-normal">{date}</p>
                                    <p className="tasks-details-subtitle-normal">|</p>
                                    <p className="tasks-details-subtitle-bold">Hosted by:</p>
                                    <p className="tasks-details-subtitle-normal">Member 1</p>
                                </div>
                                <img src="https://via.placeholder.com/150" className="event-details-img" alt="Event Image" />
                                <div className="details-main-container">
                                    <h2 className="details-main-title">Content</h2>
                                    <p className="details-main-desc">{description}</p>
                                </div>
                                <div className="details-main-container">
                                    <div className="details-top-container">
                                        <h2 className="details-main-title">Attendees</h2>
                                    </div>
                                    <ul className="details-member-list-container">
                                        <li className="details-member-list-item">
                                            <div className="details-member-list-person-wrapper">
                                                <IoPersonCircleOutline className="details-member-list-icon hide" size={40} />
                                                <p className="details-member-list-item-bold noicon">Name</p>
                                            </div>
                                            <p className="details-member-list-item-bold">Joined Date</p>
                                            <p className="details-member-list-item-bold">Group</p>
                                        </li>
                                        <li className="details-member-list-item">
                                            <div className="details-member-list-person-wrapper">
                                                <IoPersonCircleOutline className="details-member-list-icon" size={40} />
                                                <p className="details-member-list-item-normal">Member 1</p>
                                            </div>
                                            <p className="details-member-list-item-normal">00/00/2024</p>
                                            <p className="details-member-list-item-normal link">N/A</p>
                                        </li>
                                        <li className="details-member-list-item">
                                            <div className="details-member-list-person-wrapper">
                                                <IoPersonCircleOutline className="details-member-list-icon" size={40} />
                                                <p className="details-member-list-item-normal">Member 1</p>
                                            </div>
                                            <p className="details-member-list-item-normal">00/00/2024</p>
                                            <p className="details-member-list-item-normal link">N/A</p>
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

export default EventsDetails;
