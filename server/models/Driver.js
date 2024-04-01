import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    fee:{
        type:Number,
        required:true
    }

});

export default mongoose.model("Driver",DriverSchema);