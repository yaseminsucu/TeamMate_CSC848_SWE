import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import "./styles/TasksProjects.css";
import "./styles/Common.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";

function TasksProjects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const orgID = Cookies.get("orgID");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
      if (searchQuery) {
          searchTasks();
      } else {
          fetchTasks();
      }
  }, [searchQuery]);

  const fetchTasks = () => {
    const options = {
      method: "GET",
    };
    fetch(`/custom/getAllCustomSections`, options)
      .then((res) => res.json())
      .then((apiResponse) => {
        if (apiResponse && apiResponse.customSections) {
          setTasks(
            apiResponse.customSections.filter((item) => item.type === 1)
          );
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCreateTask = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        org: orgID,
        title: name,
        plainText: description,
        thirdParty: "yes",
        deadline: deadline,
        accessLevel: 1,
        type: 1,
      }),
    };

    fetch("/custom/createCustomSection", options)
      .then((res) => {
        if (res.status === 200) {
          setMessage("Success");
          setName("");
          setDescription("");
          setDeadline("");
          setShowModal(false);
          fetchTasks();
        } else {
          res.json().then((data) => {
            setMessage(data.error || res.status);
          });
        }
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        setMessage("An error occurred while creating the task.");
      });
  };

  const searchTasks = (event) => {
      const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              searchQuery: searchQuery,
              searchType: "task",
          }),
      };
      fetch("/search/ranked-search", options)
          .then((res) => res.json())
          .then((apiResponse) => {
              console.log(apiResponse);
              setTasks(apiResponse.queryResult);
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
              <h1>Tasks/Projects</h1>
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
              {tasks.length === 0 ? (
                <p className="no-tasks-message">No Tasks/Projects Created</p>
              ) : (
                <div className="tasks-container">
                  <h2>Current Tasks/Projects</h2>
                  <div className="task-list">
                    {tasks.map((task, index) => (
                      <div
                        key={index}
                        className="task-item"
                        onClick={() => navigate("/TasksProjectsDetails", {
                          state: {
                            title: task.title,
                            description: task.plainText,
                          },
                        })}
                      >
                        <div className="task-item-padding"></div>
                        <div className="task-item-info">
                          <h3 className="task-item-title">{task.title}</h3>
                          <p className="task-item-desc">{task.plainText}</p>
                          <p className="task-item-date">{task.deadline}</p>
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
            <h2>Create a Task/Project</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-popup-alt">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Type"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <div className="form-popup-alt">
                <label>Deadline:</label>
                <input
                  type="date"
                  name="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
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

export default TasksProjects;
