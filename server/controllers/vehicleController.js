import Vehicle from "../models/Vehicle.js";

export const createVehicle = async(req,res,next)=>{
    const newVehicle = new Vehicle(req.body)
    try{
        const savedVehicle = await newVehicle.save()
        res.status(200).json(savedVehicle);
    }catch(err){
        next(err);
    }
}

export const updateVehicle = async(req,res,next)=>{
    try{
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true});
        res.status(200).json(updatedVehicle);
    }catch(err){
     next(err);
    }
}

export const getVehicle = async(req,res,next)=>{
    try{
        const vehicle = await Vehicle.findById(req.params.id);
        res.status(200).json(vehicle);
    }catch(err){
     next(err);
    }
}

export const getAllVehicles = async(req,res,next)=>{
    const { vehicleType, ...others } = req.query;

    try {
      let query = {
        ...others,
      };
  
      // Add vehicleType to the query if provided
      if (vehicleType) {
        query.type = vehicleType;
      }
  
      // Add pickupDate and dropOffDate to the query if provided
      const vehicles = await Vehicle.aggregate([
        { $match: query },
        { $sample: { size: 50 } } // Adjust the size according to your needs
    ]);
      res.status(200).json(vehicles);
    } catch (err) {
      next(err);
    }
}

export const deleteVehicle = async(req,res,next)=>{
    
    try{
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json("Vehicle has been deleted");
        
    }catch(err){
        res.status(500).json(err);
    }

};