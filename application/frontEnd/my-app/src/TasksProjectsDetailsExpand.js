import React, { useState } from "react";
import { HeaderOrganizationDash } from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "./styles/TasksProjects.css";
import './styles/Common.css';
import ImplementLaterPopup from "./components/implementLaterPopup";
import { IoPersonCircleOutline } from "react-icons/io5";

function TasksProjectsDetailsExpand() {
    return (
        <div>
            <Sidebar />
            <HeaderOrganizationDash />
            <div className="main-container">
                <div className="main-content-page-alt">
                    <div className="container-page">
                        <div className="header-bar">
                            <h1>The Name of the Task/Project</h1>
                        </div>
                        <div className="content-page">
                            <div className="tasks-expand-top-container">
                                <div className="tasks-expand-top-info">
                                    <ImplementLaterPopup children='<' className='tasks-expand-arrows' />
                                    <IoPersonCircleOutline className="tasks-expand-member-icon" size={32} />
                                    <h2 className="tasks-expand-member-name">Member 1</h2>
                                    <ImplementLaterPopup children='>' className='tasks-expand-arrows' />
                                </div>
                                <div className="tasks-expand-top-buttons">
                                    <ImplementLaterPopup children='Request Revision' className='tasks-expand-revision' />
                                    <ImplementLaterPopup children='Complete' className='tasks-expand-complete' />
                                </div>
                            </div>
                            <div className="details-container">
                                <div className="details-main-container-alt">
                                    <h2 className="details-main-title">Submitted Text</h2>
                                    <p className="details-main-desc">Type</p>
                                </div>
                                <div className="details-main-container">
                                    <h2 className="details-main-title">Content</h2>
                                    <p className="details-main-desc">N/A</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksProjectsDetailsExpand;
