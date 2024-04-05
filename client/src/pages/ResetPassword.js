import React, { useState } from 'react';
import '../styles/ForgotPassword.css'; 

const ResetPassword = ({ token }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        
        try {
           
            const response = await fetch('http://localhost:8000/server/auth/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, confirmPassword, token }), 
            });

            if (response.ok) {
                setMessage('Password reset successful');
            } else {
                setMessage('Failed to reset password');
            }
        } catch (error) {
            setMessage('Failed to reset password');
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-box">
                <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleResetPassword} className="forgot-button">Reset Password</button>
                {message && <p className="forgot-message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
