import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add Product API (Handling `form-data`)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required!" });
    }

    const imagePath = `/uploads/${req.file.filename}`; // Store correct image path

    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      image: imagePath, // Store the full path
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Category mapping
const categoryMap = {
  ARTIFICIALPLANTS: "ARTIFICIAL PLANTS", // Map to database category
  NATURALPLANTSANDLEAVES: "NATURAL PLANTS AND FLOWERS", // Map to database category
  GREENROOFPLANTS: "GREEN ROOF PLANTS", // Map to database category
};

// Get Products by Category
router.get("/category/:category", async (req, res) => {
  try {
    const shortCategory = req.params.category.replace(/\s+/g, ""); // Remove spaces from request
    const fullCategory = categoryMap[shortCategory] || req.params.category; // Map to correct DB category

    console.log("Requested Category:", req.params.category); // Debugging log
    console.log("Mapped Category:", fullCategory); // Debugging log

    const products = await Product.find({ category: fullCategory }); // Query database

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category." });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;