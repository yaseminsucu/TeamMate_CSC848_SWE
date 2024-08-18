import React from "react";
import "./styles/Features.css";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import Footer from "./Footer";
import CreateOrganization from "./images/Create_Organization_Screenshot_for_Features.png";
import MembersPage from "./images/Members_page_for_features.png";
import TasksProjets from "./images/TasksProjects_for_features.png";
import EventonIpad from "./images/Eventpage_onipad_for_features.png";
import Notification from "./images/Notification_for_features.png";

const sections = [
    {
        title: "Create your own organization",
        description: "Easily set up and manage your organization's profile and settings.",
        image: CreateOrganization
    },
    {
        title: "Manage your crew the easy way",
        description: "Effortlessly keep track of your members and their profiles.",
        image: MembersPage
    },
    {
        title: "Always stay on TASKS!",
        description: "Organize and oversee tasks and projects with ease.",
        image: TasksProjets
    },
    {
        title: "Manage and join events anytime",
        description: "Schedule and participate in events seamlessly from anywhere.",
        image: EventonIpad
    },
    {
        title: "Turn on your notification today",
        description: "Stay updated with real-time notifications about your activities and tasks.",
        image: Notification
    }
];

function Features() {
    return (
        <div>
        <HeaderHome />
        <div className="features-feature">

            <div className="features-container-feature">
                {sections.map((section, index) => (
                    <div key={index} className={`feature-row-feature ${index % 2 === 0 ? 'image-left-feature' : 'image-right-feature'}`}>
                        <div className="image-container-feature">
                            <img src={section.image} alt={section.title} />
                        </div>
                        <div className="description-container-feature">
                            <h2 className="title-feature">{section.title}</h2>
                            <p className="text-feature">{section.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
        <Footer />
        </div>
    );
}

export default Features;
