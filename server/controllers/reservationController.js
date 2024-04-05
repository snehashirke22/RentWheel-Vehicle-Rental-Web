import Reservation from '../models/Reservation.js';

export const reserveVehicle = async (req, res, next) => {
    try {
        console.log("Reservation controller");
        const { vehicleId, useremail, mobile, pickup_address, return_address, pickupDate, returnDate, totalAmount, paymentStatus  } = req.body;
        
        // Create a new reservation
        const reservation = new Reservation({
            vehicleId,
            useremail,
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
        console.log("reserved", reserved);
        // Send a success response
        res.status(201).json({ message: 'Reservation successful' });
    } catch (error) {
        next(error);
    }
};