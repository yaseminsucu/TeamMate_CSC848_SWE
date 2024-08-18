import React from "react";
import fb from "./images/fb.png";
import linkedin from "./images/linkedin.png";
import instagram from "./images/instagram.png";
import youtube from "./images/youtube.png";
import twitter from "./images/twitter.png";
import telephone from "./images/telephone_icon.png";
import mail from "./images/mail_icon.png";
import location from "./images/location_icon.png";
import { useNavigate } from "react-router-dom";
import './styles/Footer.css';
import logo from "./images/TeamMate_Logo.png";

const Footer=()=> {
    const navigate = useNavigate();
    return (
  <div className="footer_home">
      <div className="footer_container">
        <div className="logo_feature_box">
          <img src={ logo } alt="TeamMate logo" />
          <p>Empowering Teams,<br></br>
            One Achievement at a Time.
            </p> 
      
          <div className="social_media">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img className="facebook_icon" src={fb} alt="facebook logo image"></img>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img className="twitter_icon" src={twitter} alt="twitter logo image"></img>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img className="instgram_icon" src={instagram} alt="instagram logo image"></img>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img className="linkedin_icon" src={linkedin} alt="linkedin logo image"></img>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img className="youtube_icon" src={youtube} alt="youtube logo image"></img>
            </a>
          </div>
        </div>

        <div className="product_feature_box">
          <h4>Product</h4>
          <div className="product_feature_links">
            <a href="#" onClick={() => navigate("/Features")}>
              Features
            </a>
            <a href="#" onClick={() => navigate("/Pricing")}>
              Pricing
            </a>
            <a href="#" onClick={() => navigate("/casestudy")}>
              Case studies
            </a>
            <a href="#" onClick={() => navigate("/comment")}>
              Reviews
            </a>
            <a href="#" onClick={() => navigate("/update")}>
              Updates
            </a>
          </div>
        </div>

        <div className="company_feature_box">
          <h4>Company</h4>
          <div className="company_feature_links">
            <a href="#" onClick={() => navigate("/About")}>
              About
            </a>
            <a href="#" onClick={() => navigate("/Contact")}>
              Contact us
            </a>
            <a href="#" onClick={() => navigate("/Careers")}>
              Careers
            </a>
            <a href="#" onClick={() => navigate("/Culture")}>
              Culture
            </a>
            <a href="#" onClick={() => navigate("/Blog")}>
              Blog
            </a>
          </div>
        </div>

        <div className="support_feature_box">
          <h4>Support</h4>
          <div className="support_feature_links">
            <a href="#" onClick={() => navigate("/gettingStarted")}>
              Getting started
            </a>
            <a href="#" onClick={() => navigate("/HelpCenter")}>
              Help center
            </a>
            <a href="#" onClick={() => navigate("/serverstatus")}>
              Server status
            </a>
            <a href="#" onClick={() => navigate("/ReportBug")}>
              Report a bug
            </a>
            <a href="#" onClick={() => navigate("/Contact")}>
              Chat support
            </a>
          </div>
        </div>

        <div className="contact_us_feature_box">
          <div className="contact_us_links">
            <h4>Contact us</h4>
            <a href="mailto:contact@company.com"> 
              <img className="contact_us_link_mail_icon" src={mail} alt="mail image"></img>
              contact@company.com
            </a>
            
            <a href="tel:=+14146875892">
              <img className="contact_us_link_phone_icon" src={telephone} alt="phone image"></img>
              (414) 687 - 5892
              </a>
            <div className="location_container">
              <img className="contact_us_link_location_icon" src={location} alt="location image"></ img>
              <p>794 Mcallister St<br></br>
                  San Francisco, CA 94102
              </p>
            </div>
          </div>
        </div>
    
      
      </div>  
      
      <hr></hr>
      
        <div className="footer_below">
          <div className="footer_below_copy_right">
            <p>
              Copyright © TeamMate
            </p>
          </div>

          <div className="footer_below_right_reserve">
            <p>All Rights Reserved |</p>
          </div>

          <div className="footer_below_terms_privacy">
            <a href="#" onClick={() => navigate("/Terms")}>
              Terms and Conditions 
            </a>
            <a href="#" onClick={() => navigate("/Terms")}>
              | Privacy Policy
            </a>
          </div>

        </div>
    </div>
    );
  }

export default Footer;
