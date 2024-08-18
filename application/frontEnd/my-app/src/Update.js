import React from "react";
import Footer from "./Footer";
import HeaderHome from "./Header";
import "./styles/Update.css";
import { FaRocket, FaBirthdayCake, FaChartLine, FaBolt, FaCalendarAlt } from 'react-icons/fa';

const updates = [
    {
        date: "July 28, 2024",
        update: "TeamMate just reached its 5000th customer!",
        icon: <FaRocket />
    },
    {
        date: "July 20, 2024",
        update: "TeamMate is celebrating its 1-year anniversary!",
        icon: <FaBirthdayCake />
    },
    {
        date: "July 15, 2024",
        update: "We launched a new dashboard for better user insights and analytics.",
        icon: <FaChartLine />
    },
    {
        date: "July 10, 2024",
        update: "Our platform's performance and loading times have been significantly improved.",
        icon: <FaBolt />
    },
    {
        date: "July 5, 2024",
        update: "New event management features are now available for easier scheduling and tracking.",
        icon: <FaCalendarAlt />
    }
];

function Updates() {
    return (
        <div className="updates-page-updates">
            <HeaderHome />
            <div className="updates-section-updates">
                <h2 className="updates-title-updates">What's New at TeamMate?</h2>
                <div className="updates-container-updates">
                    {updates.map((item, index) => (
                        <div key={index} className="update-card-updates">
                            <div className="update-icon-updates">{item.icon}</div>
                            <div className="update-content-updates">
                                <p className="update-date-updates">{item.date}</p>
                                <p className="update-text-updates">{item.update}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Updates;
