import express from "express" ;
import { createPaymentIntent,sessionstatus } from '../controllers/stripeController.js';

const router = express.Router();
//Define routes
router.post('/create-checkout-session', createPaymentIntent);
router.post('/', sessionstatus);

export default router;