import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/VehicleDetail.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HireDriver from '../components/HireDriver'; 
import { loadStripe } from '@stripe/stripe-js';

const VehicleDetail = () => {
    const { user } = useAuth();
    const location = useLocation();
    const { vehicleId } = useParams();
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const initialValues = { pickup: "", return: "" };
    const [addressValues, setAddressValues] = useState(initialValues);
    const [mobile, setMobile] = useState(initialValues);
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [driverFee, setDriverFee] = useState(0);
    const [searchData] = useState(location.state || {});
    const [showDriverModal, setShowDriverModal] = useState(false);
    const city = searchData.city || '';
    const pickupDate = searchData.pickupDate || '';
    const dropOffDate = searchData.dropOffDate || '';

    const handleChange = (event) => {
        const newObj = { ...addressValues, [event.target.name]: event.target.value };
        setAddressValues(newObj);
    };
    useEffect(() => {
        // Fetch vehicle details based on vehicleId
        const fetchVehicleDetails = async () => {
            try {
                const response = await fetch(`https://vehicle-rental-web.onrender.com/server/vehicles/${vehicleId}`);
                const data = await response.json();
                setVehicleDetails(data);
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
            }
        };

        fetchVehicleDetails();
    }, [vehicleId]);

    // Function to format date as "DD Mon" (e.g., "15 Mar")
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();

        // Pad single-digit day and month with leading zeros
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    // Calculate the number of days between pickup and dropoff dates
    useEffect(() => {
        if (pickupDate && dropOffDate) {
            const pickupDateTime = new Date(pickupDate).getTime();
            const dropOffDateTime = new Date(dropOffDate).getTime();
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const diffDays = Math.round(Math.abs((dropOffDateTime - pickupDateTime) / oneDay));
            setNumberOfDays(diffDays);
        }
    }, [pickupDate, dropOffDate]);

    // Function to calculate total rental charges
    const calculateTotalRentalCharges = () => {
        if (vehicleDetails) {
            const rentalCharges = vehicleDetails.price * numberOfDays; 
            const totalCharges = rentalCharges + driverFee + 500 + 3000; 
            return {
                rentalCharges: rentalCharges.toLocaleString('en-IN'), 
                totalCharges: totalCharges.toLocaleString('en-IN') 
            };
        }
        return { rentalCharges: 0, totalCharges: 0 };
    };
    
    const { rentalCharges, totalCharges } = calculateTotalRentalCharges();
    console.log(rentalCharges);
    if (!vehicleDetails) {
        return <div>Loading...</div>;
    }
    const handleOpenDriverModal = () => {
        setShowDriverModal(true);
    };

    const handleCloseDriverModal = () => {
        setShowDriverModal(false);
    };

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51OIslJSF708w9jZl2zXYhOZ2YdO712iJXCw64x23mRa2Ga7AsJLKQNglyOjUuXtlUtfwRqxzQumFC7sj3wBc6YyY00VwMJ8rDV");
    
    
        const reservationBody = {
            userId: user._id, 
            vehicleId: vehicleDetails._id, 
            mobile: mobile, 
            pickup_address: addressValues.pickup,
            return_address: addressValues.return,
            pickupDate: pickupDate,
            returnDate: dropOffDate,
            totalAmount: totalCharges,
            paymentStatus: 'pending' 
        };
    
        const sessionBody = {
            vehicleDetails: vehicleDetails,
            totalCharges: totalCharges 
        };
    
        const headers = {
            "Content-Type": "application/json"
        };
    
        try {
            const sessionResponse = await fetch("https://vehicle-rental-web.onrender.com/server/stripe/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(sessionBody)
            });
    
            if (!sessionResponse.ok) {
                throw new Error(`Failed to create checkout session: ${sessionResponse.statusText}`);
            }
    
            const session = await sessionResponse.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
    
            if (result.error) {
                console.error('Stripe redirect error:', result.error);
            } else {
                const reservationResponse = await fetch("https://vehicle-rental-web.onrender.com/server/reservation", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(reservationBody)
                });
    
                if (!reservationResponse.ok) {
                    throw new Error(`Reservation creation failed: ${reservationResponse.statusText}`);
                }
    
                console.log('Reservation successful');
                reservationBody.paymentStatus = 'success';
            }
        } catch (error) {
            console.error('Error making payment:', error);
            reservationBody.paymentStatus = 'failed';
        }
        console.log(reservationBody);
    };
    

    
    return (
        <>
            <Header />
            <div className={`detail-container ${showDriverModal ? 'blur' : ''}`}>
                <div className="vehicles-features">
                    <h1>{vehicleDetails.company} {vehicleDetails.model}</h1>
                    <img src={vehicleDetails.photos} alt="vehicle" className="vehicle-photo" />
                    <h3 className='booking-details'>Vehicle Specifications</h3>
                    <div className="specifications">
                        <div className="column">
                            <p>Variant: <span className="value">{vehicleDetails.variant}</span></p>
                            <p>Engine: <span className="value">{vehicleDetails.engine} cc</span></p>
                            <p>Seating Capacity: <span className="value">{vehicleDetails.seatingCapacity} seats</span></p>
                            <p>Fuel Type: <span className="value">{vehicleDetails.fuelType}</span></p>
                            <p>Dimensions: <span className="value">{vehicleDetails.dimension}</span></p>
                        </div>
                        <div className="column">
                            <p>Transmission Type: <span className="value">{vehicleDetails.transmissionType}</span></p>
                            <p>Mileage: <span className="value">{vehicleDetails.mileage}</span></p>
                            <p>Payload Capacity: <span className="value">{vehicleDetails.payloadCapacity} kg</span></p>
                            <p>No. of Tyres: <span className="value">{vehicleDetails.numberOfTyres}</span></p>
                        </div>
                    </div>

                </div>

                <div className="column2">
                    <div className="included">
                        <p>Included</p>
                        <ul>
                            <li>Doorstep Delivery</li>
                            <li>24*7 Roadside Assistance</li>
                            <li>Luggage Carrier</li>
                            <li>Fasttags</li>
                        </ul>
                    </div>
                    <div className="excluded">
                        <p>Excluded</p>
                        <ul>
                            <li>Fuel</li>
                            <li>Tolls</li>
                            <li>Parking</li>
                            <li>Interstate Charges</li>
                        </ul>
                    </div>
                    <div className="driver">
                        <h3>Need a Driver ?</h3>
                        <p>Enjoy the convenience of our driver service. sit back, relax, and let us take care of the wheel.</p>
                        <input type="submit" value="Hire Driver" onClick={handleOpenDriverModal} />
                    </div>
                </div>

                <div className="reservation-details">
                    <div className="booking-details">
                        <p>Booking Details</p>
                    </div>
                    <p style={{ textAlign: "center" }}>City : <span className="value">{city}</span></p>
                    <div className='reservation'>
                        <p style={{ margin: "0 auto" }} className="value">{formatDate(pickupDate)} To {formatDate(dropOffDate)}</p>
                    </div>

                    <div className="address-input" >
                  <label className='label'>Mobile Number</label>&nbsp;&nbsp;
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={mobile.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                    <div className="address-input">
                        <label className='label'>Pickup Address</label><br />
                        <textarea
                            id="pickup"
                            name="pickup"
                            value={addressValues.pickup}
                            onChange={handleChange}
                            rows={3}
                            style={{ resize: 'none' }}
                            required
                        />
                    </div>
                    <div className="address-input">
                        <label className='label'>Return Address</label><br />
                        <textarea
                            id="return"
                            name="return"
                            value={addressValues.return}
                            onChange={handleChange}
                            rows={3}
                            style={{ resize: 'none' }}
                            required
                        />
                    </div>

                    <div className="reservation">
                        <div className="pricing-details">
                            <h3>Pricing Details</h3>
                            <div className="price-item">
                                <p>Rental Charges:</p>
                                <p>₹ {rentalCharges}</p>
                            </div>
                            {driverFee > 0 && (
                    <div className="price-item">
                        <p>Driver's Fee:</p>
                        <p>₹ {driverFee}</p>
                    </div>
                )}
                            <div className="price-item">
                                <p>GST:</p>
                                <p>₹ 500</p>
                            </div>
                            <div className="price-item">
                                <p>Refundable Deposit:</p>
                                <p>₹ 3,000</p>
                            </div>
                            <div className="price-item total">
                                <p>Total:</p>
                                <p>₹ {totalCharges}</p>
                            </div>
                            <button className="rent-button" onClick={makePayment}>Rent Now</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="detail-container">
                <div className="note">
                <h3>Please Note!</h3>
                <ul>
                    <li>Minimum permissible age for renting out a RentWheel vehicle is 21 years and the driving license of the renter should be minimum one year old as on the rental start date</li>
                    <li>In case you are returning the vehicle at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received</li>
                    <li>Please keep your original Driving License handy. While delivering the vehicle to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory.</li>
                    <li> In the unfortunate case where you cannot show these documents, we will not be able to handover the vehicle to you, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.</li>
                    <li>Please inspect the vehicle (including the fuel gauge and odometer) thoroughly before approving the checklist.</li>
                </ul>
                </div>
            </div>
            {showDriverModal && <HireDriver onClose={handleCloseDriverModal} onDriverHire={setDriverFee}/>}
            <Footer />
        </>
    );
};

export default VehicleDetail;
