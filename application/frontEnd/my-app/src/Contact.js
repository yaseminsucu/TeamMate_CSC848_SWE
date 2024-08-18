import React, { useState } from "react";
import "./styles/Contact.css";
import Footer from "./Footer";
import HeaderHome from "./Header";

const Contact = () => {

  const [formData, setFormData] = useState ({
    name:'',
    email:'',
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
      message:''
    });
  };

  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <>
      <HeaderHome />
      <div className="contact-container">
        <section className="contact">
          <form onSubmit={handleSubmit}>
            <h2>Contact Form</h2>
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
              <label>Your Message</label>
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
        <Footer />
      </div>
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
};

export default Contact;
