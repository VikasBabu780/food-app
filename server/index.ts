import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import UserRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";

// Load environment variables
dotenv.config();

// Validate critical environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("ERROR: STRIPE_SECRET_KEY is not defined in .env file");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 8000;

// Safe dirname - works for TS and compiled JS
const DIRNAME = path.resolve();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL || true
      : "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// Serve Frontend (React SPA) in production
const staticPath = path.join(DIRNAME, "client/dist");
app.use(express.static(staticPath));

// Catch-all route for SPA - use this syntax instead of "*"
app.get("/*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Connect to DB before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});