import React from 'react';
import Footer from "./Footer";
import './styles/Culture.css';
import logo from "./images/TeamMate_Logo.png";
import event from "./images/Eventpage_onipad_for_features.png";
import organization from "./images/Create_Organization_Screenshot_for_Features.png";
import youtube from "./images/youtube.png";
import HeaderHome from './Header';

const Culture = () => {

    return (
        <>
        <div className='culture-container'>
            <HeaderHome/>
            <div className='culture-title'>
                <h1>Culture</h1>
            </div>
            <div className='culture-contents'>
                <div className='culture-content-1'>
                    <h2>This is how it started.</h2>
                    <img src={ logo } alt="TeamMate logo" /> 
                    <p>
                        TeamMate simplifies personnel management for small to mid-sized groups by consolidating key 
                        functions into a user-friendly platform.<br></br>
                        Our mission is to enhance transparency, recognition, 
                        and engagement within organizations, fostering a culture of continuous improvement and motivation.
                    </p>
                    <div className='date-text'>
                        <p>2 hrs ago | Culture</p>
                    </div>
                </div>
                <div className='culture-content-2'>
                    <h2>Create Your Organization</h2>
                    <img src={ organization } alt="Organization page logo" />
                    <p>
                        When you create your organization with TeamMate, you can create accounts, groups, and awards,
                        making the process more efficient.
                    </p>
                    <div className='date-text'>
                        <p>2 days ago | Culture</p>
                    </div>
                </div>
                <div className='culture-content-3'>
                    <h2>Create Your Event Successfully</h2>
                    <img className="event-icon" src={ event } alt="Event page logo" />
                    <p>
                        Teammate helps you create the most memorable experiences for audiences to achieve their main goals.
                    </p>
                    <div className='date-text'>
                        <p>2 days ago | Culture</p>
    
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>

    );
}

export default Culture;