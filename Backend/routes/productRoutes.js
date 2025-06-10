const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// @route POST /api/products/add
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, category, price, stock } = req.body;

    if (!req.file) return res.status(400).json({ message: 'Image file is required' });

    const newProduct = new Product({
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error); // <-- This logs the real error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
