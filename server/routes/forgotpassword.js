
import express from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';

const router = express.Router();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rajeshirkesneha22@gmail.com',
        pass: 'iwvn pcyl jrfi aclz' 
    }
});


router.post('/', async (req, res) => {
    const { email } = req.body;

    
    const token = uuidv4();

    try {
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 

        await user.save();

        // Email content
        const mailOptions = {
            from: '"Rentwheel" <rajeshirkesneha22@gmail.com>',
            to: email,
            subject: 'Forgot Password',
            text: `Click the following link to reset your password: http://localhost:3000/resetpassword?token=${token}`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Failed to send email');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('Email sent');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;