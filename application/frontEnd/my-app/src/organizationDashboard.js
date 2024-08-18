import React from 'react';
import './styles/organizationDashboard.css';
import { useNavigate, useParams } from "react-router-dom";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import Footer from './Footer';
import Sidebar from "./Sidebar";
import './styles/Common.css';

function OrganizationDashboard() {
  const navigate = useNavigate();
  const { orgName } = useParams();

  return (
    <div>
        <Sidebar />
        <HeaderOrganizationDash />
        <div className="main-container">
            <div className="main-content-page">
                <div className="container-page">
                    <div className="header-bar">
                        <h1>{orgName}</h1>
                        </div>
                        <div className="content-page">
                            <div className="allBoxContainers-organizationDashboard">
                                <button className="large-button-organizationDashboard" onClick={() => navigate("/Members")}>Members</button>
                                <button className="large-button-organizationDashboard" onClick={() => navigate("/Groups")}>Groups</button>
                                <button className="large-button-organizationDashboard" onClick={() => navigate("/Events")}>Events</button>
                                <button className="large-button-organizationDashboard" onClick={() => navigate("/TasksProjects")}>Task/Project</button>
                                <button className="large-button-organizationDashboard" onClick={() => navigate("/Recognition")}>Recognition</button>
                                <button className="large-button-organizationDashboard" onClick={() => navigate("/Highlights")}>Highlights</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizationDashboard;
