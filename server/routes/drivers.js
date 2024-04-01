import express from "express" ;
import { getDrivers , createDriver} from "../controllers/driverController.js";

const router = express.Router();

//Create
router.post("/", createDriver);

//Get All Drivers
router.get("/", getDrivers);


export default router;