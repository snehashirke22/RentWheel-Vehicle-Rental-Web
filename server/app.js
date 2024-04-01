import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import vehiclesRoute from "./routes/vehicles.js";
import driversRoute from "./routes/drivers.js";
import stripeRoute from "./routes/stripe.js";
import reservationRoute from "./routes/reservation.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    credentials: true, 
    origin: 'https://rentwheel-ecyw.onrender.com', 
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
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/vehicles", vehiclesRoute);
app.use("/drivers", driversRoute);
app.use("/stripe", stripeRoute);
app.use("/reservation", reservationRoute);


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
