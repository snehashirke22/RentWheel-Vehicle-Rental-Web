import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const { name, email, password, confirmpassword } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if password and confirm password match
        if (password === confirmpassword) {
            const registerUser = new User({
                name,
                email,
                password: hash,
                confirmpassword
            });

            // Save method is used to Register User
            const registered = await registerUser.save();
            console.log(registered);
            res.status(201).json({ message: 'User registered successfully' });

        } else {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find if user exists
        const useremail = await User.findOne({ email: email });
        if (useremail) {
            // Verify Password
            const isMatch = await bcrypt.compare(password, useremail.password);

            if (isMatch) {
                // Generate Token which is Defined in UserSchema
                // const token = await useremail.generateAuthToken();
                const token = jwt.sign({ id: useremail._id }, process.env.SECRET_KEY);
               
                // Store token in browser cookies
                res.cookie("access_token", token, {
                    // Expires in 24 hrs
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });

                return res.status(200).json({
                    message: 'Login successful',
                    user: {
                        name: useremail.name,  //send user's name and email after login with token
                        email: useremail.email
                    },
                    token: token
                });
            } else {
                // When password doesn't match
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            // When user doesn't exist
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        next(err);
    }
};
