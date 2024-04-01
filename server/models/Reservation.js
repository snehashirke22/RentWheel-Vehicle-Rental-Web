import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    pickup_address: {
        type: String,
        required: true
    },
    return_address: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus:{
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Reservation",ReservationSchema);
