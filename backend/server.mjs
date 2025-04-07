import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js"; // ✅ Import your auth route

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve images
const uploadDir = path.join(path.resolve(), "uploads");
app.use("/uploads", express.static(uploadDir));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // ✅ Add this line to register the auth routes

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
