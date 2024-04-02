import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const { user } = useAuth();

    // Function to check if the user is logged in
    const isLoggedIn = () => {
        return user !== null;
    };

    // Function for toggling Navbar
    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Function to generate active styles for links
    const getLinkStyles = (path) => {
        return window.location.pathname === path ? { backgroundColor: '#16425B', color: '#fff' } : {};
    };

    return (
        <>
            <nav>
                <div className="logo">
                    <Link to='/'>
                        <img src="../assets/logo.png" alt="logo" />
                    </Link>
                </div>
                <li to="/" className="toggle-button" onClick={toggleNavbar}>
                    {isNavbarOpen ? (
                        <span className='close-btn'></span> // Render close icon when navbar is open
                    ) : (
                        <>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </>
                    )}
                </li>
                <div className={`navbar-links ${isNavbarOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link to="/" style={getLinkStyles("/")}>Home</Link>
                        </li>
                        <li>
                            <Link to="/offervehicle" style={getLinkStyles("/offervehicle")}>Offer your vehicle</Link>
                        </li>
                        <li>
                            <Link to="/about" style={getLinkStyles("/about")}>About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" style={getLinkStyles("/contact")}>Contact Us</Link>
                        </li>
                        {isLoggedIn() ? (
                            <>
                                <li>
                                    <Link to="/account" style={getLinkStyles("/account")} className="signup">My Account</Link>
                                </li>
                                
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/register" style={getLinkStyles("/register")} className="signup">Sign Up</Link>
                                </li>
                                <li>
                                    <Link to="/login" style={getLinkStyles("/login")} className="login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Header;
