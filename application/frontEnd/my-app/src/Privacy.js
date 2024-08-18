import React from "react";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import Footer from "./Footer";
import "./styles/Privacy.css";

function Privacy () {
    return (
        <>
      <HeaderHome />
      <div className="containerPrivacy">
        <div className="privacyHookText">
          <h1>Privacy Policy</h1>
          <p>This privacy policy explains how we handle your personal data and protect your privacy when you use our services.</p>
        </div>
        <div className="privacyContent">
          <h2>Information Collection</h2>
          <p>We collect various types of information in connection with the services we provide, including:</p>
          <ul>
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Usage data (pages visited, time spent on the site, etc.)</li>
          </ul>
          
          <h2>Use of Information</h2>
          <p>The information we collect is used to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve and personalize our services</li>
            <li>Communicate with you</li>
            <li>Analyze how our services are used</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this policy, including:</p>
          <ul>
            <li>With your consent</li>
            <li>For external processing by trusted partners</li>
            <li>For legal purposes</li>
          </ul>
          
          <h2>Security of Information</h2>
          <p>We implement security measures to protect your personal information, including:</p>
          <ul>
            <li>Encryption of data</li>
            <li>Access controls to restrict access to your information</li>
            <li>Regular security audits</li>
          </ul>
          
          <h2>Changes to This Policy</h2>
          <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
        </div>
      </div>
      <Footer />
    </>

    );
}

export default Privacy;