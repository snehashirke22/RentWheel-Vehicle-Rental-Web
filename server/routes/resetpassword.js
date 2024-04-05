// Import necessary modules
import express from "express";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rajeshirkesneha22@gmail.com",
        pass: "iwvn pcyl jrfi aclz", 
    },
});


router.post("/", async (req, res) => {
    const { email, password, confirmPassword, token } = req.body;
    console.log("Received token:", token);
    if (token) {
        try {
            
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).send("Invalid or expired token");
            }

            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            await user.save();

            res.status(200).send("Password reset successful");
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        const token = uuidv4();

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send("User not found");
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; 

            await user.save();

            res.status(200).send("Email sent");
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    }
});


export default router;
