import React, { useState } from 'react';
import './styles/ReportBug.css';
import HeaderHome from './Header';
import Footer from './Footer';


function ReportBug () {

    const [formData, setFormData] = useState ({
        name:'',
        email:'',
        subject:'',
        message:''
      });
      
      const [showModal, setShowModal] = useState(false);
    
      const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData ({
          ...formData,
          [name]:value
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(true);
        setFormData({
          name:'',
          email:'',
          subject:'',
          message:''
        });
      };
    
      const closeModal = () => {
        setShowModal(false);
      }
    return (
        <>
            <HeaderHome />
                <div className="report-bug-container">
                    <section className="report">
                        <form onSubmit={handleSubmit}>
                            <h2>Report A Problem</h2>
                                <div className="input-box">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="field"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="field"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <label>Subject</label>
                                    <input
                                        type="subject"
                                        name="subject"
                                        className="field"
                                        placeholder="Enter your subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <label>Description</label>
                                    <textarea
                                        name="message"
                                        className="field mess"
                                        placeholder="Enter your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit">Send Message</button>
                        </form>
                    </section>
                </div>
            <Footer />

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Message sent</h3>
                        <button onClick={closeModal}>Ok</button>
                    </div>
                </div>
            )}
        </>

    );
}

export default ReportBug;