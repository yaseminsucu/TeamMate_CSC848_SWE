import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import "./styles/Recognition.css";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import './styles/Common.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";
import RecognitionIcon from "./images/recognitionIcon.png"

function Recognition() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const orgID = Cookies.get("orgID");
    const [awards, setAwards] = useState([]);
    const [qualifications, setQualification] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (type === "award") {
            handleCreateAward(event);
        } else if (type === "qualification") {
            handleCreateQualification(event);
        }
    };

    useEffect(() => {
        fetchRecognitions();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            searchRecognitions();
        } else {
            fetchRecognitions();
        }
    }, [searchQuery]);

    const fetchRecognitions = () => {
        fetchAwards();
        fetchQualifications();
    }

    const searchRecognitions = () => {
        searchAwards();
        searchQualifications();
    }

    const fetchAwards = () => {
        const options = {
            method: "GET",
        };
        fetch(`/award/getAwardTypes`, options)
            .then((res) => res.json())
            .then((apiResponse) => {
                if (apiResponse && apiResponse.awardTypes) {
                    setAwards(
                        apiResponse.awardTypes
                    );
                    } else {
                        setAwards([]);
                    }
            })
            .catch((error) => {
                console.error("Error fetching awards:", error);
            });
        };

        const handleCreateAward = (event) => {
            event.preventDefault();
    
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    org: orgID,
                    awardTitle: title,
                    awardDescription: description,
                    awardImage: "test",
                }),
            };
    
            fetch("/award/createAwardType", options)
                .then((res) => {
                    if (res.status === 200) {
                        setMessage("Success");
                        setTitle("");
                        setDescription("");
                        setType("");
                        setShowModal(false);
                        fetchRecognitions();
                    } else {
                        res.json().then((data) => {
                            setMessage(data.error || res.status);
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error creating award:", error);
                    setMessage("An error occurred while creating the award.");
                });
        };

    const fetchQualifications = () => {
        const options = {
            method: "GET",
        };
        fetch(`/qualification/getQualificationType`, options)
            .then((res) => res.json())
            .then((apiResponse) => {
                if (apiResponse && apiResponse.qualifications) {
                    setQualification(
                        apiResponse.qualifications
                    );
                    } else {
                        setQualification([]);
                    }
            })
            .catch((error) => {
                console.error("Error fetching qualifications:", error);
            });
        };

        const handleCreateQualification = (event) => {
            event.preventDefault();
    
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    org: orgID,
                    qualificationTitle: title,
                    qualificationDescription: description,
                    qualificationImage: "test",
                }),
            };
    
            fetch("/qualification/createQualificationType", options)
                .then((res) => {
                    if (res.status === 200) {
                        setMessage("Success");
                        setTitle("");
                        setDescription("");
                        setType("");
                        setShowModal(false);
                        fetchRecognitions();
                    } else {
                        res.json().then((data) => {
                            setMessage(data.error || res.status);
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error creating qualification:", error);
                    setMessage("An error occurred while creating the qualification.");
                });
        };

        const searchAwards = (event) => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchQuery: searchQuery,
                    searchType: "awards",
                }),
            };
            fetch("/search/ranked-search", options)
                .then((res) => res.json())
                .then((apiResponse) => {
                    console.log(apiResponse);
                    setAwards(apiResponse.queryResult);
                    if (apiResponse.status === 200) {
                        alert("Search Query Successful");
                    }
                });
        };

        const searchQualifications = (event) => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchQuery: searchQuery,
                    searchType: "qualifications",
                }),
            };
            fetch("/search/ranked-search", options)
                .then((res) => res.json())
                .then((apiResponse) => {
                    console.log(apiResponse);
                    setQualification(apiResponse.queryResult);
                    if (apiResponse.status === 200) {
                        alert("Search Query Successful");
                    }
                });
        };

    return (
        <div>
            <Sidebar />
            <HeaderOrganizationDash />
            <div className="main-container">
                <div className="main-content-page">
                    <div className="container-page">
                        <div className="header-bar">
                            <h1>Recognition</h1>
                            <div className="search-create">
                                <div className="search-bar-container">
                                    <FaMagnifyingGlass size={20} className="search-icon" />
                                    <input
                                        className="textarea"
                                        type="text"
                                        id="search"
                                        placeholder="Search"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button id="create-button" onClick={handleCreateClick}><HiOutlinePlusSmall size={36} /></button>
                            </div>
                        </div>
                        <div className="content-page">
                            {awards.length === 0 && qualifications.length === 0 ? (
                                <p className="no-recognitions-message">No recognitions created</p>
                            ) : (
                                <div className="recognitions-container">
                                    <h2>Awards</h2>
                                    <div className="recognition-list">
                                        {awards.map((award, index) => (
                                            <div key={index} className="recognition-item" onClick={() => navigate("/RecognitionDetails", {
                                                state: {
                                                  title: award.awardTitle,
                                                  description: award.awardDescription,
                                                },
                                              })}>
                                                <img src={RecognitionIcon} className="recognition-item-img" alt="recognition Image" />
                                                <div className="recognition-item-info">
                                                    <h3 className="recognition-item-title">{award.awardTitle}</h3>
                                                    <p className="recognition-item-desc">{award.awardDescription}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <h2>Qualifications</h2>
                                    <div className="recognition-list">
                                        {qualifications.map((qualification, index) => (
                                            <div key={index} className="recognition-item" onClick={() => navigate("/RecognitionDetails")}>
                                                <img src={RecognitionIcon} className="recognition-item-img" alt="recognition Image" />
                                                <div className="recognition-item-info">
                                                    <h3 className="recognition-item-title">{qualification.qualificationTitle}</h3>
                                                    <p className="recognition-item-desc">{qualification.qualificationDescription}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal-popup">
                    <div className="modal-content-popup">
                        <span className="close-popup"><RxCrossCircled style={{cursor: "pointer"}} size={36} onClick={handleModalClose} /></span>
                        <h2>Create a Recognition</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-popup-popup">
                                <label>Recognition Name</label>
                                <input type="text" name="title" placeholder="Type" onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="form-popup-popup">
                                <label>Description (50 Words)</label>
                                <textarea name="description" placeholder="Type" onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="form-popup-popup">
                                <label>Type of Recognition</label>
                                <select name="recognitionType" placeholder="Select" onChange={(e) => setType(e.target.value)} required>
                                    <option value="" disabled selected hidden>Select</option>
                                    <option value="award">Award</option>
                                    <option value="qualification">Qualification</option>
                                </select>
                            </div>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recognition;