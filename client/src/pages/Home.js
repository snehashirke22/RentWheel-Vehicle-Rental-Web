import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import Homecontent from '../components/Homecontent';
import '../styles/Home.css'
import { Link, useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AuthProvider, useAuth } from '../context/AuthContext';


const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({ city: 'Mumbai', vehicleType: 'Car', pickupDate: new Date().toISOString().split('T')[0], dropOffDate: new Date().toISOString().split('T')[0]});

  const handleChange = (event) => {
    const newObj = { ...searchData, [event.target.name]: event.target.value }
    setSearchData(newObj);
  };

  const handleSearch = () => {
    if (user) {
      navigate('/searchrental', { state: searchData });
    } else {
      navigate('/login');
    }
  };

 // Calculate today's date in the "YYYY-MM-DD" format
 const todaysDate = new Date();
 todaysDate.setDate(todaysDate.getDate() + 1);
 const minDateFormatted = todaysDate.toISOString().split('T')[0];
 
 // Calculate the future date, 30 days from today
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateFormatted = maxDate.toISOString().split('T')[0]+1;

  
  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero_container">
          <div className="hero_text">
            <h1>Ultimate Solution To Find <span class="hero_text_span">Affordable Vehicle Rentals</span></h1>
          </div>
          <div className="image_container">
            <img src="assets/vehicle2.png" alt="vehicle" />
          </div>

        </div>
      </section>


      <section className="search-container">
        <div className="search-content">
          <form class="search">
            <div className="label-input-container">
              <PlaceIcon />
              <label htmlFor="city">location</label>
              <select id="city" name="city" value={searchData.city}  
                onChange={handleChange}>
                <option value="Mumbai">Mumbai</option>
                <option value="Banglore">Banglore</option>
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="label-input-container">
              <DirectionsCarIcon />
              <label htmlFor="vehicleType">Vehicle Type</label>
              <select id="vehicleType" name="vehicleType" value={searchData.vehicleType}
                onChange={handleChange}>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            <div className="label-input-container">
              <CalendarTodayIcon />
              <label htmlFor="pickupDate">Pickup Date</label>
              <input type="date" id="pickupDate" name="pickupDate" value={searchData.pickupDate} 
                onChange={handleChange} required  min={minDateFormatted} max={maxDateFormatted}/>
            </div>

            <div className="label-input-container">
              <CalendarTodayIcon />
              <label htmlFor="dropOffDate">Return Date</label>
              <input type="date" id="dropOffDate" name="dropOffDate" value={searchData.dropOffDate}
                onChange={handleChange} required  min={minDateFormatted} max={maxDateFormatted} />
            </div>
              <button type="submit" onClick={handleSearch}>Search Rentals</button>
          </form>
        </div>
      </section>

      <section className="offer">
        <div className="offer_container">
          <div className="left-side_offer">
            <img src="assets/offervehicle.png" alt="Ioffervehicle" />
          </div>
          <div className="right-side_offer">
            <h1>Unlock new opportunities by offering your vehicle for rent on<span style={{ color: "#4cc9f0" }}> RentWheel</span></h1>
            <p>Join our community of vehicle owners and earn extra income effortlessely. Whether its a car, bike, truck or any other vehicle, share the ride and make your vehicle work for you!</p>
            <Link to='./offervehicle'><button>Offer Your Vehicle</button></Link>
          </div>
        </div>
      </section>
    <Homecontent />
      <Footer />
    </>
  );
}

export default Home