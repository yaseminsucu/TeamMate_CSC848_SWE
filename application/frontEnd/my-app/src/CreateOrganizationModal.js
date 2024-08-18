import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles/dashboard.css';
import './styles/Common.css';
import { useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

Modal.setAppElement('#root'); 

function CreateOrganizationModal({ isOpen, onRequestClose, getAllUserOrganizations }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orgName: name,
        orgDescription: type
      }),
    };

    fetch("/organization/create", options).then((res) => {
        if (res.status === 200) {
          setMessage("Organization created successfully");
          setName("");
          setType("Other");
          onRequestClose();
          navigate(`/organizationDashboard/${name}`);
        } else {
          setMessage(res.message);
        }
      })
      .catch((error) => {
        console.error("Error creating organization:", error);
        setMessage("An error occurred while creating the organization.");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Organization"
      className="modal"
      overlayClassName="overlay"
    >      
      <div className="modal-popup">
          <div className="modal-content-popup">
              <span className="close-popup">
                <RxCrossCircled style={{cursor: "pointer"}} size={36} onClick={onRequestClose} />
              </span>
              <h2>Create Organization</h2>
              <form
              className="createOrganizationForm"
              onSubmit={handleCreate}
              >
              <div className="form-popup-popup">
                  <label>
                      Organization name
                  </label>
                  <input
                      className="input-fields-create-organization"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Insert Name"
                      required
                  />
              </div>
              <div className="form-popup-popup">
                  <label>
                      Description
                  </label>
                  <input
                      className="input-fields-create-organization"
                      name="description"
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)} 
                      placeholder="Insert description"
                      required
                  />
              </div>
              <button type="submit">Create</button>
              {message && <p className='error-message'>{message}</p>}
              </form>
          </div>
      </div>
    </Modal>
  );
}

export default CreateOrganizationModal;
