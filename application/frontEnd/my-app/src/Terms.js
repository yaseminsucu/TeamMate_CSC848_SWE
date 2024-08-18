import React from "react";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import Footer from "./Footer";
import "./styles/Terms.css"



function Terms () {
    return (
        <>
      <HeaderHome />
      <div className="containerTerms">
        <div className="termsHookText">
          <h1>Terms and Conditions</h1>
          <p>Welcome to TeamMate! Please read these terms and conditions carefully before using our service.</p>
        </div>
        <div className="termsContent">
          <h2>Acceptance of Terms</h2>
          <p>By accessing or using our services, you agree to be bound by these terms and conditions. If you do not agree with any part of the terms, then you may not access the service.</p>
          
          <h2>Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will provide notice of changes by posting the new terms on this page. Your continued use of the service following the posting of changes constitutes your acceptance of such changes.</p>
          
          <h2>Use of Service</h2>
          <p>You agree to use the service only for lawful purposes and in accordance with the terms. You agree not to use the service:</p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit any unsolicited or unauthorized advertising or promotional material.</li>
            <li>To impersonate or attempt to impersonate TeamMate, a TeamMate employee, another user, or any other person or entity.</li>
          </ul>
          
          <h2>Intellectual Property</h2>
          <p>The service and its original content, features, and functionality are and will remain the exclusive property of TeamMate and its licensors. The service is protected by copyright, trademark, and other laws of both the country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of TeamMate.</p>
          
          <h2>Termination</h2>
          <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the terms.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about these terms, please contact us at support@teammate.com.</p>
        </div>
      </div>
      <Footer />
    </>
    );
}

export default Terms;