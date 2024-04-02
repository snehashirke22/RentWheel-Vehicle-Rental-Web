import React, { useState,useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import useFetch from '../hooks/useFetch';
import "../styles/SearchRental.css";
const SearchRental = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(location.state || {});
  const city = searchData.city || '';
  const vehicleType = searchData.vehicleType || '';
  const pickupDate = searchData.pickupDate || '';
  const dropOffDate = searchData.dropOffDate || '';

  //fetching data 
  //const { data, loading } = useFetch(`http://localhost:8000/server/vehicles?vehicleType=${searchData.vehicleType}&pickupDate=${searchData.pickupDate}&dropOffDate=${searchData.dropOffDate}`);
  const { data, loading } = useFetch(`http://localhost:8000/server/vehicles?vehicleType=${searchData.vehicleType}`);
  console.log(data);

  //State variables for edit search toggle
  const [showFirstSearch, setShowFirstSearch] = useState(true);

  
  // State variables for filter options
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [transmissionTypes, setTransmissionType] = useState([]);
  const [fuelTypes, setFuelType] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    const newObj = { ...searchData, [event.target.name]: event.target.value }
    setSearchData(newObj);
  };


 //For toggling search bar edit option
 const toggleSearchContainer = () => {
  setShowFirstSearch(!showFirstSearch);
};

 // Calculate today's date in the "YYYY-MM-DD" format
 const todaysDate = new Date();
 todaysDate.setDate(todaysDate.getDate() + 1);
 const minDateFormatted = todaysDate.toISOString().split('T')[0];

 // Calculate the future date, 30 days from today
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  
  // Filter data based on selected filter options
  useEffect(() => {
    let filtered = data.filter(item => {
      // Check if the seating capacity matches the selected seat numbers
      if (seatNumbers.length > 0 && !seatNumbers.includes(item.seatingCapacity.toString())) {
        return false;
      }
      // Check if the transmission type matches the selected transmission types
      if (transmissionTypes.length > 0 && !transmissionTypes.includes(item.transmissionType)) {
        return false;
      }
      // Check if the fuel type matches the selected fuel types
      if (fuelTypes.length > 0 && !fuelTypes.includes(item.fuelType)) {
        return false;
      }
      // Check if the price falls within the selected price range
      if (priceRange.min !== null && priceRange.max !== null) {
        if (item.price < priceRange.min || item.price > priceRange.max) {
          return false;
        }
      }
      return true;
    });
    setFilteredData(filtered);
    
  }, [data, vehicleType, seatNumbers, transmissionTypes, fuelTypes, priceRange]);


  // For filter options
  const handleSeatNumberChange = (value) => {
    if (seatNumbers.includes(value)) {
      setSeatNumbers(seatNumbers.filter(seat => seat !== value));
    } else {
      setSeatNumbers([...seatNumbers, value]);
    }
  };

  const handleTransmissionTypeChange = (value) => {
    if (transmissionTypes.includes(value)) {
      setTransmissionType(transmissionTypes.filter(type => type !== value));
    } else {
      setTransmissionType([...transmissionTypes, value]);
    }
  };

  const handleFuelTypeChange = (value) => {
    if (fuelTypes.includes(value)) {
      setFuelType(fuelTypes.filter(fuel => fuel !== value));
    } else {
      setFuelType([...fuelTypes, value]);
    }
  };

  const handlePriceRangeChange = (event) => {
    const selectedRange = event.target.value;
    let minPrice, maxPrice;
    switch (selectedRange) {
      case '0-500':
        minPrice = 0;
        maxPrice = 500;
        break;
      case '501-1000':
        minPrice = 501;
        maxPrice = 1000;
        break;
      case '1001-2000':
        minPrice = 1001;
        maxPrice = 2000;
        break;
      default:
        minPrice = 0;
        maxPrice = 10000;
    }
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const formatPriceRange = () => {
    return `${priceRange.max} - ${priceRange.min}`;
  };


  const handleResetFilters = () => {
    setSeatNumbers([]);
    setTransmissionType([]);
    setFuelType([]);
    setPriceRange({ min: 0, max: 10000 });
    setShowFilter(false);
  };

  const handleViewButtonClick = (vehicleId) => {
    navigate(`/vehicledetail/${vehicleId}`, { state: searchData }); // Navigate to the VehicleDetail route
  };
  return (
<>
<Header />
{/*Edit search */}
{showFirstSearch ? (
<section className="rental-search-container">
        <div className="rental-search-content">
          <div class="rental-search">
            <div className="rental-label-input-container">
              <label htmlFor="city">Location : <span style={{fontWeight:"bold"}}>{city}</span></label>
              </div>

              <div className="rental-label-input-container">
              <label htmlFor="vehicleType">Vehicle Type : <span style={{fontWeight:"bold"}}>{vehicleType}</span></label>
              </div>

              <div className="rental-label-input-container">
              <label htmlFor="PickupDate">Pickup Date : <span style={{fontWeight:"bold"}}>{pickupDate}</span></label>
              </div>

              <div className="rental-label-input-container">
              <label htmlFor="droOffDate">Return Date : <span style={{fontWeight:"bold"}}>{dropOffDate}</span></label>
              </div>

              <span className="edit-option" onClick={toggleSearchContainer}>Modify Search</span>
              </div>
              </div>
</section>
      ) : (
/* after clicking on Edit search */
<section className="rental-search-container">
        <div className="rental-search-content">
          <form class="rental-search">
            <div className="rental-label-input-container">
              <label htmlFor="city">location:</label>
              <select id="city" name="city" value={searchData.city}
                onChange={handleChange}>
                <option value="Mumbai">Mumbai</option>
                <option value="Banglore">Banglore</option>
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="rental-label-input-container">
              <label htmlFor="vehicleType">Vehicle Type:</label>
              <select id="vehicleType" name="vehicleType" value={searchData.vehicleType}
                onChange={handleChange}>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            <div className="rental-label-input-container">
              <label htmlFor="pickupDate">Pickup Date:</label>
              <input type="date" id="pickupDate" name="pickupDate" value={searchData.pickupDate}
                onChange={handleChange} required  min={minDateFormatted} max={maxDateFormatted}/>
            </div>

            <div className="rental-label-input-container">
              <label htmlFor="dropOffDate">Return Date:</label>
              <input type="date" id="dropOffDate" name="dropOffDate" value={searchData.dropOffDate}
                onChange={handleChange} required  min={minDateFormatted} max={maxDateFormatted} />
            </div>

              <div class="cancel-icon" onClick={toggleSearchContainer}></div>
          </form>
        </div>
      </section>
  )}

  {/* Filter options */}
  <div className="cancel-icon" onClick={() => setShowFilter(false)}>x</div>
  <div className={`filter-container ${showFilter ? 'show' : ''}`}>
        <div className="filter-option">
          <h3>Filters</h3>
          <span className='clear-option' onClick={handleResetFilters}>Clear all</span>
          </div>
          <br/>
          
          <div className="filter-item">
            <h4>Seating Capacity:</h4>
            <label>
              <input type="checkbox" value="4" onChange={() => handleSeatNumberChange('4')} checked={seatNumbers.includes('4')} /> 4
            </label>
            <label>
              <input type="checkbox" value="5" onChange={() => handleSeatNumberChange('5')} checked={seatNumbers.includes('5')} /> 5
            </label>
            <label>
              <input type="checkbox" value="6" onChange={() => handleSeatNumberChange('6')} checked={seatNumbers.includes('6')} /> 6
            </label>
            <label>
              <input type="checkbox" value="7" onChange={() => handleSeatNumberChange('7')} checked={seatNumbers.includes('7')} /> 7 or more
            </label>
          </div><br/>

          <div className="filter-item">
            <h4>Transmission Type:</h4>
            <label>
              <input type="checkbox" value="Automatic" onChange={() => handleTransmissionTypeChange('Automatic')} checked={transmissionTypes.includes('Automatic')} /> Automatic
            </label>
            <label>
              <input type="checkbox" value="Manual" onChange={() => handleTransmissionTypeChange('Manual')} checked={transmissionTypes.includes('Manual')} /> Manual
            </label>
          </div><br/>

          <div className="filter-item">
            <h4>Fuel Type:</h4>
            <label>
              <input type="checkbox" value="Petrol" onChange={() => handleFuelTypeChange('Petrol')} checked={fuelTypes.includes('Petrol')} /> Petrol
            </label>
            <label>
              <input type="checkbox" value="Diesel" onChange={() => handleFuelTypeChange('Diesel')} checked={fuelTypes.includes('Diesel')} /> Diesel
            </label>
            <label>
              <input type="checkbox" value="Electric" onChange={() => handleFuelTypeChange('Electric')} checked={fuelTypes.includes('Electric')} /> Electric
            </label>
            <label>
              <input type="checkbox" value="Hybrid" onChange={() => handleFuelTypeChange('Hybrid')} checked={fuelTypes.includes('Hybrid')} /> Hybrid
            </label>
          </div><br/>

          <div className="filter-item">
          <h4>Price Range:</h4>
          <select value={formatPriceRange()} onChange={handlePriceRangeChange}>
            <option value="default">0 - 10000</option>
            <option value="0-500">0 - 500</option>
            <option value="501-1000">501 - 1000</option>
            <option value="1001-2000">1001 - 2000</option>
          </select>
            </div>
            </div>
               
          <div className='filter-button-container'>
          <p className='total-count'>&nbsp; &nbsp; {filteredData.length} Vehicles are available</p>
          <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>
          {showFilter ? <TuneSharpIcon /> : <TuneSharpIcon />}
          </button>
          </div>

{/*Vehicle Card*/}
<div className="vehicle-container">
{loading ? (
    "Loading"
  ) : (
    <>
  {filteredData.map((item) => (
      <div className="vehicle-card" key={item.id}>
        <img src={item.photos} alt="vehicle" className="vehicle-photo" />
        <div className="vehicle-info">
          <p className="vehicle-model">{item.company} {item.model}</p>
          <p className='vehicle-variant'>{item.variant}</p>

          <ul className="vehicle-features">
          <li><img src="../assets/transmission.png" alt="" /> {item.transmissionType}</li>
          <li><img src="../assets/fueltype.png" alt="" /> {item.fuelType}</li>
            {item.type === 'Bike' ? (
              <li><img src="../assets/mileage.png" alt="" /> {item.mileage}</li>
              ) : (
                <li><img src="../assets/carseat.png" alt="" /> {item.seatingCapacity} seats</li>
                )}
            
          </ul>

          <div className="vehicle-details">
            <p className="vehicle-price">₹ {item.price.toLocaleString('en-IN')}<span style={{ fontSize: "15px", fontWeight: "500" }}>/day</span></p>
            <button className="view-button" onClick={() => handleViewButtonClick(item._id)}>View</button>
          </div>
        </div>
      </div>
    ))}
    </>
  )}
    </div>
    
    <Footer />

</>
    )
}

export default SearchRental;