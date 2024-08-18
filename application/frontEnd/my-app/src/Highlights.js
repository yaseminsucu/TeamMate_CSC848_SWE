import React, { useState, useEffect } from "react";
import { HeaderOrganizationDash } from "./Header";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import "./styles/Highlights.css";
import "./styles/Common.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";

function Highlights() {
  const orgID = Cookies.get("orgID");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHighlights();
  }, []);

  useEffect(() => {
      if (searchQuery) {
          searchHighlights();
      } else {
          fetchHighlights();
      }
  }, [searchQuery]);

  const fetchHighlights = () => {
    const options = {
      method: "GET",
    };
    fetch(`/custom/getAllCustomSections`, options)
      .then((res) => res.json())
      .then((apiResponse) => {
        if (apiResponse && apiResponse.customSections) {
          setHighlights(
            apiResponse.customSections.filter((item) => item.type === 2)
          );
        } else {
          setHighlights([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching highlights:", error);
      });
  };

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCreateHighlight = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        org: orgID,
        title: title,
        plainText: description,
        thirdParty: "yes",
        accessLevel: 1,
        type: 2,
      }),
    };

    fetch("/custom/createCustomSection", options)
      .then((res) => {
        if (res.status === 200) {
          setMessage("Success");
          setTitle("");
          setDescription("");
          setShowModal(false);
          fetchHighlights();
        } else {
          res.json().then((data) => {
            setMessage(data.error || res.status);
          });
        }
      })
      .catch((error) => {
        console.error("Error creating highlight:", error);
        setMessage("An error occurred while creating the highlight.");
      });
  };

  const searchHighlights = (event) => {
      const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              searchQuery: searchQuery,
              searchType: "highlight",
          }),
      };
      fetch("/search/ranked-search", options)
          .then((res) => res.json())
          .then((apiResponse) => {
              console.log(apiResponse);
              setHighlights(apiResponse.queryResult);
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
              <h1>Highlights</h1>
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
                <button id="create-button" onClick={handleCreateClick}>
                  <HiOutlinePlusSmall size={36} />
                </button>
              </div>
            </div>
            <div className="content-page">
              {highlights.length === 0 ? (
                <p className="no-highlights-message">No highlights created</p>
              ) : (
                <div className="highlights-container">
                  <div className="highlight-list">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <div className="highlight-item-info">
                          <div className="highlight-item-top">
                            <h3 className="highlight-item-title">
                              {highlight.title}
                            </h3>
                          </div>
                          <div className="highlight-item-default-img"> </div>
                          <p className="highlight-item-desc">
                            {highlight.plainText}
                          </p>
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
            <span className="close-popup">
              <RxCrossCircled
                style={{ cursor: "pointer" }}
                size={36}
                onClick={handleModalClose}
              />
            </span>
            <h2>Create a Highlight</h2>
            <form onSubmit={handleCreateHighlight}>
              <div className="form-popup-alt">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Type"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-popup-alt">
                <label>Description:</label>
                <textarea
                  name="description"
                  placeholder="Type"
                  className="textarea-alt-large"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="popup-submit-button">
                Create
              </button>
            </form>
            {message && <p className="error-message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Highlights;
