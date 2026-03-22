import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

// Routes
import UserRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//  Validate important env variables (DO NOT crash unless necessary)
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing");
}

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing");
}

//  Optional (only if using Stripe)
// if (!process.env.STRIPE_SECRET_KEY) {
//   console.error("STRIPE_SECRET_KEY is missing");
// }

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

//  CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL as string,
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

//  Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

//  Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  REMOVE frontend static serving (important for your setup)

//  DO NOT USE THIS
// const staticPath = path.join(__dirname, "client/dist");
// app.use(express.static(staticPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(staticPath, "index.html"));
// });

// Handle unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });