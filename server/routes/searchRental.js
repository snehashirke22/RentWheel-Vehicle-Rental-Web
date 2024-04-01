// routes.js

import express from 'express';
import { verifyToken } from '../utils/verifyToken';

const router = express.Router();

router.get('/searchrental', verifyUser, (req, res) => {
    // Route logic for the searchrental page
});

export default router;
