import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['Car', 'Bike', 'Bicycle', 'Bus', 'Truck'],
        required:true
    },
    company:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    variant:{
        type:String,
        default: null
    },
    engine:{
        type:Number,
        default: null
    },
    price:{
        type:Number,
        required:true
    },
    photos:{
        type:String,
        required:true
    },
    seatingCapacity:{
        type:Number,
        required:true
    },
    fuelType:{
        type:String,
        enum:['Petrol','Diesel','Electric','Hybrid'],
        required:true
    },
    dimension:{
        type: String,
        default: null
    },
    transmissionType:{
        type:String,
        enum:['Automatic', 'Manual'],
        required:true
    },
    mileage:{
        type: String,
        required:true
    },
    payloadCapacity: 
    { 
        type: Number, 
        default: null 
    },
    numberOfTyres:{
        type: Number,
        default:null
    },
    bookings: [{
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
      }],
  
    featured:{
        type:Boolean,
        default:false
    },
    
});

export default mongoose.model("Vehicle",VehicleSchema);