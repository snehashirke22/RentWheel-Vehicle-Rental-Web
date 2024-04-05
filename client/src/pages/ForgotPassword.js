import React, { useState } from 'react';
import '../styles/ForgotPassword.css'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await fetch('http://localhost:8000/server/auth/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Email sent! Check your inbox for password reset instructions.');
            } else {
                setMessage('Failed to send email. Please try again later.');
            }
        } catch (error) {
            setMessage('Failed to send email. Please try again later.');
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-box">
                <h2>Forgot Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleForgotPassword} className="forgot-button">Send Email</button>
                {message && <p className="forgot-message">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
