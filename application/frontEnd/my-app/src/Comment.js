import React from "react";
import Footer from "./Footer";
import HeaderHome from "./Header";
import "./styles/Comment.css";

const fakeComments = [
    {
        name: "John Doe",
        date: "July 25, 2024",
        comment: "TeamMate has been a game-changer for our non-profit. Highly recommend!"
    },
    {
        name: "Jane Smith",
        date: "July 20, 2024",
        comment: "Using TeamMate made managing our volunteers so much easier and more efficient."
    },
    {
        name: "Alice Johnson",
        date: "July 18, 2024",
        comment: "The best platform for tracking progress and achievements in our community group."
    },
    {
        name: "Bob Brown",
        date: "July 15, 2024",
        comment: "Our team loves the recognition tools. It keeps everyone motivated!"
    }
];

function Comments() {
    return (
        <div>
            <HeaderHome />
        <div className="comments-page-comments">
            
            <div className="comments-section-comments">
                <h2 className="comments-title-comments">Customer Comments</h2>
                <div className="comments-container-comments">
                    {fakeComments.map((comment, index) => (
                        <div key={index} className="comment-card-comments">
                            <p className="comment-name-comments">{comment.name}</p>
                            <p className="comment-date-comments">{comment.date}</p>
                            <p className="comment-text-comments">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
        <Footer />
        </div>
    );
}

export default Comments;
