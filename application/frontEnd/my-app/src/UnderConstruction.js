import React from 'react';
import './styles/UnderConstruction.css';
import HeaderHome from './Header';
import Footer from './Footer';

function UnderConstruction() {
  return (
    <>
      <HeaderHome />
      <div className="containerUnderConstruction">
        <div className="underConstructionText">
          <h1>Page Under Construction</h1>
          <p>We're working hard to bring you this page. Please check back soon for updates.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UnderConstruction;
