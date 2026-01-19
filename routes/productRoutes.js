const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// =============================================
// 1. POST /api/products - Create a Product
// =============================================
router.post('/', async (req, res) => {
    try {
        // create new product from request body
        const product = await Product.create(req.body);

        // Return created product with 201 status
        res.status(201).json(product);
    } catch (error) {
        
        // Handle validation errors with 400 status
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
});

// ===============================================
// 2. GET /api/products/:id - Read Single Product
// ===============================================
router.get('/:id', async(req, res) => {
    try {
        // Find product by ID
        const product = await Product.findById(req.params.id);
        // If product not found, return 404
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Return found product
        res.json(product);
    }catch (error) {
        // Handle invalid ID format
        res.status(400).json({ message: "Failed to retrieve product", error: error.message });
    }
});

// =============================================
// 3. PUT /api/products/:id - Update a Product
// =============================================