import React from "react";
import Footer from "./Footer";
import "./styles/CaseStudy.css";
import HeaderHome from "./Header";

function CaseStudy() {
    return (
        <div>
            <HeaderHome />
            <div className="case-study-home-casestudy">
                <div className="case-study-intro-casestudy">
                    <h1 className="case-study-title-casestudy">Boy Scouts of America in Silicon Valley</h1>
                    <p className="case-study-overview-casestudy">
                        See how TeamMate helped Dave and his scouts stay motivated and connected during tough times.
                    </p>
                </div>
                
                <div className="case-study-content-casestudy">
                    <h2>Executive Summary</h2>
                    <p>
                        TeamMate is a comprehensive personnel management solution tailored for small to mid-sized groups. It consolidates various aspects of personnel management into a single, user-friendly platform, making it perfect for both informal and professional settings.
                    </p>
                    
                    <h2>Challenges</h2>
                    <p>
                        During COVID, Dave, a leader for Boy Scouts of America in Silicon Valley, saw a drop in scout activities and motivation. He needed a way to showcase scout achievements online to keep everyone engaged.
                    </p>

                    <h2>Solution</h2>
                    <p>
                        Dave signed up for TeamMate and created an organization for all Silicon Valley troops. He used the group category to organize each troop, imported all awards, and began assigning scouts to their respective groups and awards.
                    </p>
                    <p>
                        Realizing it was too much work alone, Dave invited his friend Chris to join as an administrator. Together, they managed the scouts' groups and awards. The dashboard allowed them to see all scouts, organized by troop, and view detailed information about each scout and their achievements.
                    </p>
                    
                    <h2>Results</h2>
                    <p>
                        With TeamMate, Dave and Chris could track all their scouts on one platform. Scouts and their families could easily check progress and achievements, keeping everyone motivated and connected.
                    </p>
                    <ul>
                        <li>Easier management of scout information</li>
                        <li>Increased scout motivation and participation</li>
                        <li>Better engagement among scouts and families</li>
                    </ul>
                    <blockquote className="testimonial-casestudy">
                        "TeamMate made managing our scouts so much easier. The scouts feel more recognized, and it's great for their motivation." – Dave, Boy Scout Leader
                    </blockquote>

                    <h2>Conclusion</h2>
                    <p>
                        TeamMate proved invaluable for Dave and his scouts, simplifying management and boosting engagement. Want similar results? Contact us today!
                    </p>
                    
                    <div className="call-to-action-casestudy">
                        <p>Want to see these results for your group? <a href="/contact">Contact us</a> today to see how TeamMate can help!</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CaseStudy;
