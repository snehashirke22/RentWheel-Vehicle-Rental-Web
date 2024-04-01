import React from 'react';
import Header from '../components/Header';
import '../styles/About.css'; 
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Header />
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-us-image">
            <img src="../assets/extra.png" alt="About Us" />
          </div>
          <div className="about-us-text">
            <h1>About <span style={{ color: "#1a6e9f" }}>RentWheel</span></h1>
            <p>
              Welcome to our innovative vehicle rental platform, where convenience meets reliability. 
              We've crafted a seamless experience for both renters and vehicle owners, 
              aiming to redefine how you rent and manage vehicles. Our mission is simple: 
              to provide a user-friendly platform that simplifies the rental process while promoting 
              sustainable transportation solutions.<br/><br />
              At our app, you'll find an extensive selection of vehicles, from compact cars to spacious buses, vans, trucks, and motorcycles. 
            Whether you need a vehicle for a few hours, a day, or an extended period, we offer flexible rental options to suit your needs. 
            Our intuitive booking system ensures a hassle-free experience, backed by secure transactions and round-the-clock customer support. 
            Join us today and discover a smarter, more convenient way to rent and list vehicles.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
