import Reservation from '../models/Reservation.js';

export const reserveVehicle = async (req, res) => {
    try {
        console.log("Reservation controller");
        const { userId, vehicleId, mobile, pickup_address, return_address, pickupDate, returnDate, totalAmount, paymentStatus  } = req.body;
        
        // Create a new reservation
        const reservation = new Reservation({
            userId,
            vehicleId,
            mobile,
            pickup_address,
            return_address,
            pickupDate,
            returnDate,
            totalAmount,
            paymentStatus 
        });
        // Save the reservation to the database
        const reserved = await reservation.save();
        console.log(reserved);
        // Send a success response
        res.status(201).json({ message: 'Reservation successful' });
    } catch (error) {
        console.error('Error reserving vehicle:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};