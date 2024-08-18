import React from 'react';
import Footer from './Footer';
import './styles/Blog.css';
import HeaderHome from './Header';
import logo from './images/TeamMate_Logo.png';
import member from './images/Members_page_for_features.png';

const Blog = () => {
    return (
        <>
            <HeaderHome/>
            <div className="blog-container">
                <div className='blog-content-title'>
                    <h1>Blog</h1>
                </div>
                <div className="blog-content">
                    
                    <div className="blog-posts">
                        <div className="blog-post">
                            <h2>How to Plan Sustainable Events</h2>
                            <img className="blog-post-logo"src={ logo } alt="TeamMate logo" /> 
                            <p>The Ultimate Guide</p>
                            <div className='date-text'>
                                <p>8 hrs ago | Blog</p>
                            </div>
                        </div>
                        <div className="blog-post">
                            <h2>Editors' Pick</h2>
                            <img className="blog-post-member-icon" src={ member } alt="Members page image" />
                            <p>How to Sell More Tickets to Your Next Events.</p>
                            <div className='date-text'>
                                <p>1 day ago | Blog</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    );
}

export default Blog;
