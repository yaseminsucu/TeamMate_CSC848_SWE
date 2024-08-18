import React from 'react';
import './styles/gettingStarted.css';
import HeaderHome from './Header';
import Footer from './Footer';



function GettingStarted () {

    return (
        <>
        <HeaderHome />
            <div className='getting-started-container'>
                <div className='getting-started-title'>
                    <h1>Getting Started</h1>
                </div>

                <div className='getting-started-content-container'>
                    <div className='getting-started-content-1'>
                        <h2>1. A Base overview of What needed to start the project</h2>
                        <p>
                            This is a Capstone Project of Senior Undergraduate Computer Science Students
                            of San Francisco State University.<br></br>

                            Cornerstone of the class is student team project (in team of 8 students) where students
                            engage in a team project in order to experience and practice key aspects of full Software
                            Engineering life-cycle in setting that simulates small Software company.
                        </p>

                    </div>

                    <div className='getting-started-content-2'>
                        <h2>2. Basecamp (project management Software used)</h2>
                        <h3>
                            Followings are the Technology Stack used in the project
                        </h3>
                        <ul>
                            <li>Server: AWS EC2</li>
                            <li>Operation System: Amazon Linux AMI</li>
                            <li>Database: MySQL</li>
                            <li>Web Server: Express 4.19.2</li>
                        </ul>

                        <h3>Additional Technology</h3>
                        <ul>
                            <li>Frontend Framework: React</li>
                            <li>Backend Framework: Node.js</li>
                            <li>IDE: Visual Studio Code, MySQL Workbench</li>
                            <li>SSL Cert: Lets Encrypt (Cert Bot)</li>
                            <li>Docker: Docker Container on the EC2 instance</li>
                        </ul>

                    </div>

                    <div className='getting-started-content-3'>
                        <h2>3. The Development Process</h2>
                            <p>
                                The time frame of the project was exactly (10) weeks from the planning to the delivery.
                                We followed to address these methodologies:
                            </p>
                            <ul>
                                <li>Software Requirements and Specification</li>
                                <li>Software Design</li>
                                <li>Software Implementation</li>
                                <li>Software Testing and Validation</li>
                                <li>Software Evolution</li>
                            </ul>

                    </div>
                </div>
            </div>


        <Footer />
        </>

    );
}

export default GettingStarted;