import express from "express" ;
import { createVehicle, getVehicle, updateVehicle, getAllVehicles, deleteVehicle } from "../controllers/vehicleController.js";

const router = express.Router();

//Create
router.post("/", createVehicle);

//update
router.put("/:id", updateVehicle);

//Get
router.get("/:id", getVehicle)

//Get All
router.get("/", getAllVehicles);

//Delete
router.delete("/:id", deleteVehicle);

export default router;