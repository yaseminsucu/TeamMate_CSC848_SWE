import React from 'react';
import './styles/HelpCenter.css';
import HeaderHome from './Header';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

function HelpCenter() {
    const navigate = useNavigate();

    return (
      <>
        <HeaderHome />
        <div className="help-center-container">
            <div className='help-center-title'>
                <h1>TeamMate Help Center</h1>
            </div>

            <div className='help-center-body'>
                <div className='help-center-body-item-1'>
                    <p>All the members and audiences are important to us.<br></br>
                        This page provides links to documents and resources to users access our content.
                    </p>
                </div>

                <div className='help-center-body-item-2'>
                    <h2>TeamMate Accessibility Help</h2>
                    <ul>
                        <li>
                            <a href='#' onClick={() => navigate("/register")}>Sign up for a new user</a>
                        </li>
                        <li>
                            <a href='#' onClick={() => navigate("/login")}>Sign in for user</a>
                        </li>
                        <li>
                            <a href='#' onClick={() => navigate("/Contact")}>Contact us</a>
                        </li>
                        <li>
                            <a href='#' onClick={() => navigate("/ReportBug")}>Report a Bug</a>
                        </li>
                    </ul>

                </div>

                <div className='help-center-body-item-3'>
                    <h2>TeamMate Accessibility Terms, Conditions and Policy</h2>
                    <ul>
                        <li>
                            <a href='#' onClick={() => navigate("/Terms")}>Terms and Conditions</a>
                        </li>
                        <li>
                            <a href='#' onClick={() => navigate("/Privacy")}>Privacy Policy</a>
                        </li>
                    </ul>

                </div>

            </div>
          
        
        </div>
        <Footer />
      </>
    );
  }
  
  export default HelpCenter;