import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from 'react-modal';
import '../styles/Account.css'; 
Modal.setAppElement('#root');

const Account = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Destructure the logout function from useAuth
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true); 
  };

  const confirmLogout = () => {
    logout(); 
    setIsModalOpen(false); 
    navigate('/'); 
  };

  const cancelLogout = () => {
    setIsModalOpen(false); 
  };

  return (
    <>
    <Header />
    <div className="account-container">
      <h1>Account Details</h1>
      <div className="card">
      {user && (
        <div className="user-info">
          <div className="profile">
            <img src="../assets/account.png" alt="Profile" className="profile-image" />
          </div>
          <div className="details">
            <p className="name">Name: {user.name}</p>
            <p className="email">Email: {user.email}</p>
          </div>
        </div>
      )}
      
      <button onClick={handleLogout} className="logout">Logout</button>

      <Modal
        isOpen={isModalOpen}
        contentLabel="Are you sure you want to logout?"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Are you sure you want to logout?</h2>
        <button className="logout" onClick={confirmLogout}>Yes</button>
        <button className="logout" onClick={cancelLogout}>No</button>
      </Modal>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default Account;
