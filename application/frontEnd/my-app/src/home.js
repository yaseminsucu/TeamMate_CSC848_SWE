import { useNavigate } from "react-router-dom";
import "./styles/home.css";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import Footer from "./Footer";
import React from "react";
import memberImg from "./images/memberHome.png"

function Home() {
  return (
    <>
      <HeaderHome />
      <body>
        <div className="containerHome">
          <div className="hookText">
            <h1>
              Recognize, Reward, and Reimagine Team Collaboration
            </h1>
            <p>
              Transform your organization with TeamMate. Our platform highlights
              individual achievements, tracks certifications, and manages
              events, fostering a culture of recognition and continuous
              improvement. Join TeamMate and see your team thrive.
            </p>
          </div>
          <div className="mainFeatures">
            <div className="featureBoxes">
              <div className="featureBoxOne">
                <div className="featureBoxImage">
                  <img src={ memberImg } alt="image-icon" /> 
                </div>
                <h2>Track Members</h2>
                < p>Keep track of your organization's members, their roles, and their progress with ease</p>
              </div>
              
              <div className="featureBoxTwo">
                <div className="featureBoxImage">
                  <img src={ memberImg } alt="image-icon" /> 
                </div>
                <h2>Create and Assign Tasks</h2>
                <p>Effortlessly create and assign tasks and projects to your team members, ensuring everyone stays on track</p>
              </div>
              
              <div className="featureBoxThree"> 
                <div className="featureBoxImage">
                  <img src={ memberImg } alt="image-icon" /> 
                </div>
                <h2>Provide Recognitions</h2>
                <p>Motivate your team by providing recognitions and awards for their achievements and contributions</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      <Footer /> 
    </>
  );
}

export default Home;
