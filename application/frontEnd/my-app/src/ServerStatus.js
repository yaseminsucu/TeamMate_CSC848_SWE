import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import HeaderHome from './Header';
import './styles/ServerStatus.css';
import { FaCheckCircle } from 'react-icons/fa';

function ServerStatus() {
    const [status, setStatus] = useState('No recent issues or events to report.');

    useEffect(() => {
        setStatus('No recent issues or events to report.');
    }, []);

    return (
        <div className="server-status-page">
            <HeaderHome />
            <div className="server-status-section">
                <h2 className="server-status-title">Current Server Status</h2>
                <div className="server-status-container">
                    <div className="server-status-card">
                        <p className="server-status-message">{status}</p>
                        <FaCheckCircle className="server-status-icon" />
                    </div>
                </div>
                <div className="server-status-footer">
                    <p>Think there's a problem? <a href="/ReportBug">Report a problem</a></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ServerStatus;
