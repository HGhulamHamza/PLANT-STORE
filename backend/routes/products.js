import express from "express";
import multer from "multer";
import Product from "../models/Product.js";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

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

// Add Product
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required!" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      image: imagePath,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Get products by category
router.get("/category/:categoryName", async (req, res) => {
    try {
        const categoryName = decodeURIComponent(req.params.categoryName);
        const products = await Product.find({ category: categoryName });
        res.json(products);
    } catch (error) {
        console.error("Error fetching category products:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
