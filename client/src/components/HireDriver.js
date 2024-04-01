
import React from 'react';
import '../styles/HireDriver.css';
import useFetch from '../hooks/useFetch';

const HireDriver = ({ onClose, onDriverHire }) => {

    const { data, loading } = useFetch(`http://localhost:8000/server/drivers`);
    console.log(data);


    const handleDriverHire = (driverPrice) => {
        onDriverHire(driverPrice); // Passing selected driver's fee to parent component
        onClose(); 
    };

    return (
        <div className="hire-driver-modal">
            <div className="close-btn" onClick={onClose}></div>
            <h2>Available Drivers</h2>
            <div className="driver-container">
                {loading ? (
                    "Loading"
                ) : (
                    <>
                        {data.map((driver) => (
                            <div key={driver.id} className="driver-box">
                                <h3>{driver.name}</h3>
                                <p>Age: {driver.age}</p>
                                <p>Experience: {driver.experience} yrs</p>
                                <p>Fee: ₹ {driver.fee}</p>
                                <button onClick={() => handleDriverHire(driver.fee)}>Hire</button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default HireDriver;
