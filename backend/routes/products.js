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
    console.log("Uploaded File:", req.file); // Debugging Log

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required!" });
    }

    const imagePath = `/uploads/${req.file.filename}`; // Correct image path

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
  ARTIFICIALPLANTS: "ARTIFICIAL PLANTS",
  NATURALPLANTSANDLEAVES: "NATURAL PLANTS AND FLOWERS",
  GREENROOFPLANTS: "GREEN ROOF PLANTS",
};

router.get("/category/:categoryName", async (req, res) => {
  try {
    const categoryKey = decodeURIComponent(req.params.categoryName).replace(/\s+/g, " ").trim();
    const categoryRegex = new RegExp(`^${categoryKey}$`, "i"); // Case-insensitive, exact match

    console.log("Fetching products for category:", `"${categoryKey}"`);

    const products = await Product.find({ category: categoryRegex });

    if (products.length === 0) {
      console.log("No products found for category:", `"${categoryKey}"`);
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


export default router;
