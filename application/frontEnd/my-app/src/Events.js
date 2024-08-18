import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderOrganizationDash } from "./Header";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import "./styles/Events.css";
import "./styles/Common.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RxCrossCircled } from "react-icons/rx";

function Events() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const orgID = Cookies.get("orgID");
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            searchEvents();
        } else {
            fetchEvents();
        }
    }, [searchQuery]);

    const fetchEvents = () => {
        const options = {
            method: "GET",
        };
        fetch(`/event/getAllEvents`, options)
            .then((res) => res.json())
            .then((apiResponse) => {
                if (apiResponse && apiResponse.events) {
                    const eventFormatted = apiResponse.events.map(event => ({
                        ...event,
                        eventDate: new Date(event.eventDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        }),
                    }));
                    setEvents(eventFormatted);
                } else {
                    setEvents([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    };

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleCreateEvent = (event) => {
        event.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                org: orgID,
                eventTitle: name,
                eventDescription: description,
                eventType: eventType,
                eventDate: date,
            }),
        };

        fetch("/event/create", options)
            .then((res) => {
                if (res.status === 200) {
                    setMessage("Event created successfully");
                    setName("");
                    setDescription("");
                    setEventType("");
                    setDate("");
                    setShowModal(false);
                    fetchEvents();
                } else {
                    res.json().then((data) => {
                        setMessage(data.error || res.status);
                    });
                }
            })
            .catch((error) => {
                console.error("Error creating event:", error);
                setMessage("An error occurred while creating the event.");
            });
    };

    const searchEvents = (event) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                searchQuery: searchQuery,
                searchType: "events",
            }),
        };
        fetch("/search/ranked-search", options)
            .then((res) => res.json())
            .then((apiResponse) => {
                console.log(apiResponse);
                setEvents(apiResponse.queryResult);
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
                            <h1>Events</h1>
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
                            {events.length === 0 ? (
                                <p className="no-events-message">No events created</p>
                            ) : (
                                <div className="events-container">
                                    <h2>Current Events</h2>
                                    <div className="event-list">
                                        {events.map((event, index) => (
                                            <div key={index} className="event-item" onClick={() => navigate("/EventsDetails", {
                                                state: {
                                                  title: event.eventTitle,
                                                  description: event.eventDescription,
                                                  date: event.eventDate,
                                                },
                                              })}>
                                                <div className="event-item-padding"></div>
                                                <div className="event-item-info">
                                                    <h3 className="event-item-title">{event.eventTitle}</h3>
                                                    <p className="event-item-desc">{event.eventDescription}</p>
                                                    <p className="event-item-date">{event.eventDate}</p>
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
                        <h2>Create an Event</h2>
                        <form onSubmit={handleCreateEvent}>
                            <div className="form-popup-alt">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Type"
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
                                <label>Event Type:</label>
                                <div className="event-type-buttons">
                                    <button
                                        type="button"
                                        onClick={() => setEventType("in-person")}
                                    >
                                        In-Person
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEventType("virtual")}
                                    >
                                        Virtual
                                    </button>
                                </div>
                            </div>
                            <div className="form-popup-alt">
                                <label>Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
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

export default Events;
