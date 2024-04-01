import React from 'react';
import '../styles/Cancel.css'; 
import {Link} from 'react-router-dom';
const Cancel = () => {
  return (
    <div className="failed-payment-page">
      <div className="failed-container">
        <h1>Payment Failed!</h1>
        <p>Sorry, your payment was unsuccessful. Please try again.</p>
        <Link to='/'>Return to the Home Page </Link>
      </div>
    </div>
  );
};

export default Cancel;
