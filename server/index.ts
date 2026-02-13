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

// Safe dirname - works for both TS and compiled JS
const DIRNAME = path.resolve();

// Default Middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

// Cors Options - allow production origin
const corsOptions = {
    origin: process.env.NODE_ENV === "production" 
        ? process.env.CLIENT_URL || true  // Set CLIENT_URL in Render env vars or allow all
        : "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// Serve Frontend Build
// When compiled, the JS file is in server/dist/, so we need to go up to root
const staticPath = process.env.NODE_ENV === "production"
    ? path.join(DIRNAME, "client/dist")
    : path.join(DIRNAME, "/client/dist");

app.use(express.static(staticPath));

app.get("*", (_, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});