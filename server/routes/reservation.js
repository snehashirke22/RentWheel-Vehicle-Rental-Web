import express from "express" ;
import {reserveVehicle} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/reserveVehicle", reserveVehicle);

export default router;
