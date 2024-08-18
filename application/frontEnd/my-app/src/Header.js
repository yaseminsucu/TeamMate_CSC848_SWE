import { useNavigate, useLocation } from "react-router-dom";
import './styles/Header.css';
import notification from "./images/notification.png";
import user from "./images/user.png"
import React, { useState, useEffect } from "react";
import logo from "./images/teamMateLogoWhite.png"
import Cookies from "js-cookie";
import { FaRegBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import ImplementLaterPopup from "./components/implementLaterPopup";

const HeaderHome=()=> {
    const navigate = useNavigate();
    return (
        <header className="header-home">
            <div className="home-logo" onClick={() => navigate("/home")}>
                <img src={ logo } alt="TeamMate logo" /> 
            </div>
            <nav className="header-home-nav">
                <a href="#" onClick={() => navigate("/Features")}>Features</a>
                <a href="#" onClick={() => navigate("/Pricing")}>Pricing</a>
                <a href="#" onClick={() => navigate("/About")}>About</a>
            </nav>
            <div className="authButtons">
                <button className="authButton signinButton" onClick={() => navigate("/login")}>Sign in</button>
                <button className="authButton signupButton" onClick={() => navigate("/register")}>Sign up</button>
            </div>
        </header>
    );
}

const HeaderOrganizationDash=()=>{
        const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
        const [showUserDropdown, setShowUserDropdown] = useState(false);
        const [userID, setUserID] = useState();
        const navigate = useNavigate();
        const location = useLocation();
    
        const getUserID = async() => {
            const options = {
                method: "GET",
            };
            const res = await fetch("/profile/userID", options);
            const apiResponse = await res.json();
            setUserID(apiResponse.userID);
        };

        useEffect(() => {
            getUserID();
        }, []);

        const isActivePage = (path) => {
            return location.pathname == path ? 'active' : '';
        };
    
        const handleBellClick = () => {
            setShowNotificationDropdown(!showNotificationDropdown);
            setShowUserDropdown(false);
        };

        const handleUserClick = () => {
            setShowUserDropdown(!showUserDropdown);
            setShowNotificationDropdown(false);
        };

        const handleLogout = () => {
            Cookies.remove('user');
            navigate('/home');
        }
    
    return (
        <div className="header-organization">
            <div className="header-organization-middle">
                <a className={isActivePage("/Members")} onClick={() => navigate("/Members")}>Members</a>
                <a className={isActivePage("/Groups")} onClick={() => navigate("/Groups")}>Groups</a>
                <a className={isActivePage("/Events")} onClick={() => navigate("/Events")}>Events</a>
                <a className={isActivePage("/TasksProjects")} onClick={() => navigate("/TasksProjects")}>Tasks/Projects</a>
                <a className={isActivePage("/Recognition")} onClick={() => navigate("/Recognition")}>Recognition</a>
                <a className={isActivePage("/Highlights")} onClick={() => navigate("/Highlights")}>Highlights</a>
            </div>

            <div className="header-organization-icons">
                <a href="#" onClick={handleBellClick} className="header-icon">
                    <FaRegBell size={32} />
                </a>

                <a href="#" onClick={handleUserClick} className="header-icon">
                    <IoPersonCircleOutline size={32} />
                </a>

                {showNotificationDropdown && (
                    <div className="notification-dropdown">
                        <div className="notification-header">
                            <span className="profile-notification">Notifications</span>
                            <button className="close-button" onClick={() => setShowNotificationDropdown(false)}>×</button>
                        </div>
                        <div className="notification-tabs">
                            <span className="notification-tabs-span">All</span>
                            <span className="notification-tabs-span">Unread</span>
                        </div>
                        <div className="notification-body">
                            <div className="notification-item">
                                <span className="notification-item-span">Today</span>
                                <p>You earned a reward for attending event!</p><br></br><br></br>
                                    Thank you for joining TeamMate.
                            </div>
                            <div className="notification-item">
                                <span className="notification-item-span">Yesterday</span>
                                <p>Your can earn a reward for tomorrow event!<br></br><br></br>
                                    Thank you for joining TeamMate.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {showUserDropdown && (
                    <div className="user-dropdown">
                        <div className="user-header">
                            <span className="profile-notification">Profile #{userID}</span>
                            <button className="close-button" onClick={() => setShowUserDropdown(false)}>×</button>
                        </div>
                        <div className="user-body">
                            <div className="user-item">
                                <ImplementLaterPopup children='Your Profile' className='user-button' />
                            </div>
                            <div className="user-item">
                                <ImplementLaterPopup children='Settings' className='user-button' />
                            </div>
                            <div className="user-item">
                                <button className='logout-button' onClick={() => navigate("/home")}>Sign Out</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const HeaderNavigation=()=>{
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [userID, setUserID] = useState();
    const navigate = useNavigate();

    const getUserID = async() => {
        const options = {
            method: "GET",
        };
        const res = await fetch("/profile/userID", options);
        const apiResponse = await res.json();
        setUserID(apiResponse.userID);
    };

    useEffect(() => {
        getUserID();
    }, []);


    const handleBellClick = () => {
        setShowNotificationDropdown(!showNotificationDropdown);
        setShowUserDropdown(false);
    };

    const handleUserClick = () => {
        setShowUserDropdown(!showUserDropdown);
        setShowNotificationDropdown(false); 
    }; 


    return (
        <div className="header-organization">

            <div className="header-organization-middle">
                <a className="header-links-disabled"></a>
                <a className="header-links-disabled"></a>
                <a className="header-links-disabled"></a>
                <a className="header-links-disabled"></a>
                <a className="header-links-disabled"></a>
            </div>

            <div className="header-organization-icons">
                <a href="#" onClick={handleBellClick} className="header-icon">
                    <FaRegBell size={32} />
                </a>

                <a href="#" onClick={handleUserClick} className="header-icon">
                    <IoPersonCircleOutline size={32} />
                </a>

                {showNotificationDropdown && (
                    <div className="notification-dropdown">
                        <div className="notification-header">
                            <span className="profile-notification">Notifications</span>
                            <button className="close-button" onClick={() => setShowNotificationDropdown(false)}>×</button>
                        </div>
                        <div className="notification-tabs">
                            <span className="notification-tabs-span">All</span>
                            <span className="notification-tabs-span">Unread</span>
                        </div>
                        <div className="notification-body">
                            <div className="notification-item">
                                <span className="notification-item-span">Today</span>
                                <p>You earned a reward for attending event!</p><br></br><br></br>
                                    Thank you for joining TeamMate.
                            </div>
                            <div className="notification-item">
                                <span className="notification-item-span">Yesterday</span>
                                <p>Your can earn a reward for tomorrow event!<br></br><br></br>
                                    Thank you for joining TeamMate.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {showUserDropdown && (
                    <div className="user-dropdown">
                        <div className="user-header">
                            <span className="profile-notification">Profile #{userID}</span>
                            <button className="close-button" onClick={() => setShowUserDropdown(false)}>×</button>
                        </div>
                        <div className="user-body">
                            <div className="user-item">
                                <ImplementLaterPopup children='Your Profile' className='user-button' />
                            </div>
                            <div className="user-item">
                                <ImplementLaterPopup children='Settings' className='user-button' />
                            </div>
                            <div className="user-item">
                                <button className='logout-button' onClick={() => navigate("/home")}>Sign Out</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HeaderHome;
export {HeaderOrganizationDash, HeaderNavigation};