import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import vehiclesRoute from "./routes/vehicles.js";
import driversRoute from "./routes/drivers.js";
import stripeRoute from "./routes/stripe.js";
import reservationRoute from "./routes/reservation.js";
import forgotPasswordRoute from "./routes/forgotpassword.js";
import resetpasswordRoute from "./routes/resetpassword.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000', 
}));

// Configuring ENV files and connection files
dotenv.config({ path: './config.env' });
const port = process.env.PORT;

// MongoDB Connection
const db = process.env.DATABASE;
mongoose.connect(db).then(() =>{
    console.log("Connection Successful");
}).catch((error) =>{
    console.log(error);
});

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/server/auth", authRoute);
app.use("/server/users", usersRoute);
app.use("/server/vehicles", vehiclesRoute);
app.use("/server/drivers", driversRoute);
app.use("/server/stripe", stripeRoute);
app.use("/server/reservation", reservationRoute);
app.use('/server/auth/forgotpassword', forgotPasswordRoute);
app.use('/server/auth/resetpassword', resetpasswordRoute);


// Error handler middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
