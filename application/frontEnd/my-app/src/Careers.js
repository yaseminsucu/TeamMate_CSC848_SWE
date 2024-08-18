import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./styles/Careers.css";
import logo from "./images/TeamMate_Logo.png";
import HeaderHome from "./Header";

const Careers = () => {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

  return (
    <>
      <HeaderHome />
      <div className="careers-container">
        <div className="careers-content">
          <h2>Current Opening:</h2>
          <div className="job-listings">
            <div className="job-item">
              <h3>Full Stack Engineer</h3>
              <p>
                San Francisco, California - Onsite<br></br>
                {formattedDate}
              </p>
            </div>
            <div className="job-item">
              <h3>UI/UX Designer</h3>
              <p>
                Oakland, California - Hybrid<br></br>
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Careers;
