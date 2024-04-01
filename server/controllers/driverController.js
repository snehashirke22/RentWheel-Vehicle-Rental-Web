import Driver from "../models/Driver.js";


export const createDriver = async(req,res,next)=>{
    const newDriver = new Driver(req.body)
    try{
        const savedDriver = await newDriver.save()
        res.status(200).json(savedDriver);
    }catch(err){
        next(err);
    }
}



export const getDrivers = async (req, res, next) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (err) {
        next(err);
    }
}
