import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from "path";

// Load environment variables
dotenv.config();

// Validate critical environment variables
if (!process.env.STRIPE_SECRET_KEY) {
    console.error("ERROR: STRIPE_SECRET_KEY is not defined in .env file");
    process.exit(1);
}

const app = express();

const PORT = process.env.PORT || 8000;

// Safe dirname for your setup
const DIRNAME = path.resolve();

// Default Middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

// Cors Options
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// Serve Frontend Build
const clientPath = path.join(DIRNAME, "client", "dist");

app.use(express.static(clientPath));

app.get(/.*/, (_, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
