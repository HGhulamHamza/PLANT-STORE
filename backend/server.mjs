import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";


dotenv.config();
const app = express();

// Middleware (Order is important)
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials (if needed)
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve images statically
const uploadDir = path.join(path.resolve(), "uploads");
app.use("/uploads", express.static(uploadDir));
app.use("/api/products", productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
