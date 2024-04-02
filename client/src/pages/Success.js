import React from 'react';
import '../styles/Success.css';
import {Link} from 'react-router-dom';
const Success = () => {
  return (
    <div className="success-page">
      <div className="success-container">
        <h1>Payment Successful!</h1>
        <h2>Booking is confirmed</h2>
        <p>Thank you for your payment. Your transaction was successful.</p>
        <Link to='/'>Return to the Home Page </Link>
      </div>
    </div>
  );
};

export default Success;
