import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="footer">
          <div className="about content">
            <div className="logo"><img src="../assets/logo.png" alt="logo" /></div>
            <p>"Where the Road Meets Convenience - RentWheels, Your Journey Begins Here."</p><br />
            <h2>Find us on</h2>
            <div className="social">
              <Link to="/"><i className="fab fa-facebook"></i></Link>
              <Link to="/"><i className="fab fa-instagram"></i></Link>
              <Link to="/"><i className="fab fa-twitter"></i></Link>
              <Link to="/"><i className="far fa-envelope"></i></Link>

            </div>
          </div>
          <div className="links content content2">
            <h2>Useful Links</h2>
            <ul>
              <li><Link to="/" >Home</Link></li>
              <li><Link to="/">Search Rentals</Link></li>
              <li><Link to="/offervehicle">Offer Vehicle</Link></li>
              <li><Link to="/about" >About us</Link></li>
              <li><Link to="/contact" >Contact us</Link></li>
            
              
            </ul>
          </div>
          <div className="links content content2">
            <h2>About us</h2>
            <ul>
              <li><Link to="/" >Deals</Link></li>
            <li><Link to="/" >FAQs</Link></li>
            <li><Link to="/" >Privacy Policy</Link></li>
              <li><Link to="/" >Terms & Conditions</Link></li>
             
            </ul>
          </div>
          <div className="newsletter content">
            <h2>Our Newsletter</h2>
            <p>Subscribe for our newsletter and hit the road with confidence! Get updates on vehicle maintenance tips, travel hacks, and special discounts, all delivered directly to your inbox.</p>
            <form action="#">
              <input type="email" placeholder="Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
      <div className="copyright-container">
        <p>&copy; 2024 RentWheels. All rights reserved.</p>
      </div>

    </>
  );
};

export default Footer;
