import React from "react";
import Footer from "./Footer";
import "./styles/About.css";
import { useNavigate } from "react-router-dom";
import HeaderHome from "./Header";
import avatar1 from "./images/avatar1.png";
import avatar2 from "./images/avatar2.png";
import avatar3 from "./images/avatar3.png";
import avatar4 from "./images/avatar4.png";
import avatar5 from "./images/avatar5.png";
import avatar6 from "./images/avatar6.png";
import avatar7 from "./images/avatar7.png";
import avatar8 from "./images/avatar8.png";

function About() {
    const navigate = useNavigate();

    const crewMembers = [
        {
            name: "Tharun Krishina",
            title: "Team Lead",
            image: avatar1
        },
        {
            name: "Randolf Gabrielle Uy",
            title: "Backend Lead",
            image: avatar2
        },
        {
            name: "Carlos Hernandez",
            title: "Database Lead",
            image: avatar3
        },
        {
            name: "Tyron Cheung",
            title: "Frontend Lead",
            image: avatar4
        },
        {
            name: "Naw San",
            title: "Frontend Dev",
            image: avatar5
        },
        {
            name: "Jannelly Hernandez Umanzor",
            title: "Backend Dev",
            image: avatar6
        },
        {
            name: "Yasemin Sucu",
            title: "Backend Dev",
            image: avatar7
        },
        {
            name: "Xuefeng Guan",
            title: "Frontend Dev",
            image: avatar8
        },
    ];

    return (
        <div>
        <HeaderHome />

        <div className="about-page">

            <div className="about-home">
                <div className="mission-section-home">
                    <h2 className="mission-title-home">OUR MISSION</h2>
                    <p className="mission-description-home">
                    TeamMate simplifies personnel management for small to mid-sized groups by consolidating key functions into a user-friendly platform. Our mission is to enhance transparency, recognition, and engagement within organizations, fostering a culture of continuous improvement and motivation.
                    </p>
                </div>
                <div className="crew-section-home">
                    <h2 className="crew-title-home">INTRODUCING OUR CREW</h2>
                    <div className="crew-container-home">
                        {crewMembers.map((member, index) => (
                            <div key={index} className="crew-member-home">
                                <div className="crew-image-home">
                                    <img src={member.image} alt={`${member.name}'s portrait`} />
                                </div>
                                <div className="crew-info-home">
                                    <p className="crew-name">{member.name}</p>
                                    <p className="crew-title">{member.title}</p>
                                    <p className="crew-bio">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
        </div>
    );
}

export default About;
