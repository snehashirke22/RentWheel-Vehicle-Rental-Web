import React, { useState } from 'react';
import '../styles/OfferVehicle.css'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const OfferVehicle = () => {
  const initialValues = { name: "", email: "", phone: "", location: "", license: "", type: "", company: "", model: "", image: "", fuel: "", transmission: "", seat: "", mileage: "", price: "" };
  const [offerValues, setOfferValues] = useState(initialValues);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const newObj = { ...offerValues, [event.target.name]: event.target.value };
    setOfferValues(newObj);
  };
  const handleClick = () => {
    navigate('/offervehicle');
  };
  return (
    <>
      <Header />
      <div className='offer-vehicle'>
        <div className='offer-content'>
          <p>
            Welcome to "RentWheels", where you can effortlessly list your vehicle and start earning extra income. Showcase your vehicle to a wide audience of potential renters and maximize its utilization with our user-friendly listing process. Join our community of vehicle owners today and unlock the potential of your asset by offering it for rent on our platform. <br />Kindly fill the details of your vehicle in below form.
          </p>
        </div>
        <div className="offer-container">
          <div className="form-one">
            <h3>Owner's Details</h3>
            <form action="#">
              <div className='offer-input-box'>
                <label className='label'>Full Name</label><br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={offerValues.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='offer-input-box'>
                <label className='label'>Email address</label><br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={offerValues.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='offer-input-box'>
                <label className='label'>Mobile No.</label><br />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={offerValues.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="offer-input-box">
                <label className='label'>location</label><br />
                <select id="city" name="city" value={offerValues.location}
                  onChange={handleChange}>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Banglore">Banglore</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              <div className='offer-input-box'>
                <label className='label'>Driving License No.</label><br />
                <input
                  type="text"
                  id="license"
                  name="license"
                  value={offerValues.license}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>
          <div className="form-two">
            <hr />
            <h3>Vehicle Details</h3>
            <form action="#">

              <div className="offer-input-box">
                <label className='label'>Vehicle Type</label><br />
                <select id="vehicleType" name="vehicleType" value={offerValues.type}
                  onChange={handleChange}>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Bicycle">Bicycle</option>
                </select>
              </div>
              <div className='offer-input-box'>
                <label className='label'>Manufacturing Company</label><br />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={offerValues.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='offer-input-box'>
                <label className='label'>Model</label><br />
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={offerValues.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='offer-input-box'>
                <label className='label'>Vehicle Image</label><br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  value={offerValues.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="offer-input-box">
                <label className='label'>Fuel Type</label><br />
                <select id="fuelType" name="fuelType" value={offerValues.fuel}
                  onChange={handleChange}>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="offer-input-box">
                <label className='label'>Transmission Type</label><br />
                <select id="transmissionType" name="transmissionType" value={offerValues.transmission}
                  onChange={handleChange}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className='offer-input-box'>
                <label className='label'>Seating Capacity</label><br />
                <input
                  type="Number"
                  id="seat"
                  name="seat"
                  value={offerValues.seat}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='offer-input-box'>
                <label className='label'>Mileage</label><br />
                <input
                  type="Number"
                  id="mileage"
                  name="mileage"
                  value={offerValues.mileage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='offer-input-box'>
                <label className='label'>Rental Price</label><br />
                <input
                  type="Number"
                  id="price"
                  name="price"
                  value={offerValues.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
            <div className="offer-input-box button">
              <input type="Submit" onClick={handleClick} value="Submit" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OfferVehicle;
